const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { authenticateToken } = require('../middlewares/auth');
const { requireStoreContext, requireStoreAccess } = require('../middlewares/storeContext');
const { FinRecurrence, Party, Store, User } = require('../models');
const { calculateNextDueDate, normalizeDueDate } = require('../services/recurrenceService');
const { Op } = require('sequelize');

const router = express.Router();

/**
 * GET /api/v1/fin-recurrences
 * Listar contratos e cobranças recorrentes (aluguéis, condomínios, taxas de gestão)
 */
router.get(
  '/',
  authenticateToken,
  requireStoreContext({ allowMissingForRoles: ['admin', 'master'] }),
  async (req, res) => {
    try {
      const {
        status, // active, paused, finished
        type, // PAYABLE, RECEIVABLE
        frequency, // weekly, monthly, yearly
        party_id,
        search,
        page = 1,
        limit = 20
      } = req.query;

      const pageNum = Math.max(parseInt(page, 10) || 1, 1);
      const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
      const offset = (pageNum - 1) * limitNum;

      const where = {};
      if (req.storeId) {
        const store = await Store.findOne({
          where: /^\d+$/.test(req.storeId) ? { id: parseInt(req.storeId, 10) } : { id_code: req.storeId },
          attributes: ['id_code']
        });
        where.store_id = store ? store.id_code : req.storeId;
      }

      if (status) where.status = status;
      if (type) where.type = type;
      if (frequency) where.frequency = frequency;
      if (party_id) where.party_id = party_id;

      if (search) {
        where.description = { [Op.iLike]: `%${search}%` };
      }

      const { count, rows } = await FinRecurrence.findAndCountAll({
        where,
        limit: limitNum,
        offset,
        order: [['next_due_date', 'ASC']],
        include: [
          {
            model: Party,
            as: 'party',
            attributes: ['id_code', 'name', 'trade_name', 'document', 'email', 'phone', 'is_customer', 'is_owner']
          }
        ]
      });

      return res.json({
        success: true,
        data: rows,
        pagination: {
          total: count,
          page: pageNum,
          limit: limitNum,
          pages: Math.ceil(count / limitNum)
        }
      });
    } catch (error) {
      console.error('Error fetching recurrences:', error);
      return res.status(500).json({ error: 'Erro ao buscar recorrências e aluguéis' });
    }
  }
);

/**
 * GET /api/v1/fin-recurrences/:id_code
 * Detalhes da recorrência
 */
router.get('/:id_code',
  authenticateToken,
  async (req, res) => {
    try {
      const { id_code } = req.params;
      const recurrence = await FinRecurrence.findOne({
        where: { id_code },
        include: [
          {
            model: Party,
            as: 'party',
            attributes: ['id_code', 'name', 'trade_name', 'document', 'email', 'phone', 'is_customer', 'is_owner']
          }
        ]
      });

      if (!recurrence) {
        return res.status(404).json({ error: 'Contrato/Recorrência não encontrada' });
      }

      return res.json({
        success: true,
        data: recurrence
      });
    } catch (error) {
      console.error('Error fetching recurrence:', error);
      return res.status(500).json({ error: 'Erro ao buscar contrato/recorrência' });
    }
  }
);

/**
 * POST /api/v1/fin-recurrences
 * Criar contrato de aluguel ou cobrança recorrente
 */
router.post('/',
  authenticateToken,
  requireStoreContext({ allowMissingForRoles: [] }),
  requireStoreAccess,
  [
    body('description').notEmpty().withMessage('Descrição é obrigatória').trim(),
    body('amount').isNumeric().withMessage('Valor deve ser numérico'),
    body('day_of_month').isInt({ min: 1, max: 31 }).withMessage('Dia do vencimento deve ser entre 1 e 31'),
    body('start_date').isDate().withMessage('Data de início é obrigatória')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation error', details: errors.array() });
    }

    try {
      const store = req.store;
      const storeIdCode = store ? store.id_code : req.storeId;
      const dayOfMonth = parseInt(req.body.day_of_month, 10);
      const frequency = req.body.frequency || 'monthly';
      const startDate = req.body.start_date;

      const nextDueDate = req.body.next_due_date
        ? normalizeDueDate(req.body.next_due_date, frequency, dayOfMonth)
        : normalizeDueDate(startDate, frequency, dayOfMonth);

      const recurrence = await FinRecurrence.create({
        store_id: storeIdCode,
        type: req.body.type || 'RECEIVABLE',
        description: req.body.description,
        amount: req.body.amount,
        frequency,
        status: req.body.status || 'active',
        start_date: startDate,
        end_date: req.body.end_date || null,
        next_due_date: nextDueDate,
        day_of_month: dayOfMonth,
        party_id: req.body.party_id || null,
        category_id: req.body.category_id || null,
        cost_center_id: req.body.cost_center_id || null,
        created_by_user_id: req.user.userId
      });

      return res.status(201).json({
        success: true,
        data: recurrence
      });
    } catch (error) {
      console.error('Error creating recurrence:', error);
      return res.status(500).json({ error: 'Erro ao criar recorrência/contrato' });
    }
  }
);

/**
 * PATCH /api/v1/fin-recurrences/:id_code/advance
 * Avançar para o próximo vencimento
 */
router.patch('/:id_code/advance',
  authenticateToken,
  requireStoreContext({ allowMissingForRoles: [] }),
  requireStoreAccess,
  async (req, res) => {
    try {
      const { id_code } = req.params;
      const recurrence = await FinRecurrence.findOne({ where: { id_code } });

      if (!recurrence) {
        return res.status(404).json({ error: 'Recorrência não encontrada' });
      }

      const nextDate = calculateNextDueDate(
        recurrence.next_due_date,
        recurrence.frequency,
        recurrence.day_of_month
      );

      // Se passou da data final (end_date), encerra o contrato
      if (recurrence.end_date && nextDate > recurrence.end_date) {
        recurrence.status = 'finished';
      } else {
        recurrence.next_due_date = nextDate;
      }

      recurrence.updated_by_user_id = req.user.userId;
      await recurrence.save();

      return res.json({
        success: true,
        message: 'Próximo vencimento avançado com sucesso',
        data: recurrence
      });
    } catch (error) {
      console.error('Error advancing recurrence:', error);
      return res.status(500).json({ error: 'Erro ao avançar vencimento' });
    }
  }
);

/**
 * PUT /api/v1/fin-recurrences/:id_code
 * Atualizar recorrência
 */
router.put('/:id_code',
  authenticateToken,
  requireStoreContext({ allowMissingForRoles: [] }),
  requireStoreAccess,
  async (req, res) => {
    try {
      const { id_code } = req.params;
      const recurrence = await FinRecurrence.findOne({ where: { id_code } });

      if (!recurrence) {
        return res.status(404).json({ error: 'Recorrência não encontrada' });
      }

      const updatable = [
        'description', 'amount', 'frequency', 'status',
        'start_date', 'end_date', 'next_due_date', 'day_of_month',
        'party_id', 'category_id', 'cost_center_id', 'type'
      ];

      for (const field of updatable) {
        if (req.body[field] !== undefined) {
          recurrence[field] = req.body[field];
        }
      }

      recurrence.updated_by_user_id = req.user.userId;
      await recurrence.save();

      return res.json({
        success: true,
        data: recurrence
      });
    } catch (error) {
      console.error('Error updating recurrence:', error);
      return res.status(500).json({ error: 'Erro ao atualizar recorrência' });
    }
  }
);

/**
 * DELETE /api/v1/fin-recurrences/:id_code
 * Finaliza ou cancela a recorrência
 */
router.delete('/:id_code',
  authenticateToken,
  requireStoreContext({ allowMissingForRoles: [] }),
  requireStoreAccess,
  async (req, res) => {
    try {
      const { id_code } = req.params;
      const recurrence = await FinRecurrence.findOne({ where: { id_code } });

      if (!recurrence) {
        return res.status(404).json({ error: 'Recorrência não encontrada' });
      }

      recurrence.status = 'finished';
      recurrence.updated_by_user_id = req.user.userId;
      await recurrence.save();

      return res.json({
        success: true,
        message: 'Contrato/Recorrência finalizada com sucesso'
      });
    } catch (error) {
      console.error('Error deleting recurrence:', error);
      return res.status(500).json({ error: 'Erro ao finalizar recorrência' });
    }
  }
);

module.exports = router;
