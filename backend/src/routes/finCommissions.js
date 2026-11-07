const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { authenticateToken } = require('../middlewares/auth');
const { requireStoreContext, requireStoreAccess } = require('../middlewares/storeContext');
const { FinancialCommission, Party, Store, User, sequelize } = require('../models');
const { Op, fn, col } = require('sequelize');

const router = express.Router();

/**
 * GET /api/v1/fin-commissions
 * Listar comissões de corretores com sumário financeiro
 */
router.get(
  '/',
  authenticateToken,
  requireStoreContext({ allowMissingForRoles: ['admin', 'master'] }),
  async (req, res) => {
    try {
      const {
        status, // pending, approved, paid, canceled
        commission_seller_id,
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
      if (commission_seller_id) where.commission_seller_id = commission_seller_id;

      // Calcular sumário por status
      const summaryWhere = req.storeId ? { store_id: where.store_id } : {};
      const summaryRows = await FinancialCommission.findAll({
        where: summaryWhere,
        attributes: [
          'status',
          [fn('COUNT', col('id')), 'count'],
          [fn('SUM', col('commission_amount')), 'total_amount']
        ],
        group: ['status']
      });

      const summary = {
        pending: { count: 0, amount: 0 },
        approved: { count: 0, amount: 0 },
        paid: { count: 0, amount: 0 },
        canceled: { count: 0, amount: 0 }
      };

      for (const row of summaryRows) {
        const raw = row && typeof row.toJSON === 'function' ? row.toJSON() : row;
        const st = raw.status;
        const cnt = raw.count !== undefined ? Number(raw.count) : 0;
        const amt = raw.total_amount !== undefined && raw.total_amount !== null ? Number(raw.total_amount) : 0;
        if (summary[st]) {
          summary[st] = { count: cnt, amount: amt };
        }
      }

      const { count, rows } = await FinancialCommission.findAndCountAll({
        where,
        limit: limitNum,
        offset,
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Party,
            as: 'commissionSeller',
            attributes: ['id_code', 'name', 'trade_name', 'document', 'email', 'phone', 'is_salesperson']
          }
        ]
      });

      return res.json({
        success: true,
        summary,
        data: rows,
        pagination: {
          total: count,
          page: pageNum,
          limit: limitNum,
          pages: Math.ceil(count / limitNum)
        }
      });
    } catch (error) {
      console.error('Error fetching commissions:', error);
      return res.status(500).json({ error: 'Erro ao buscar comissões imobiliárias' });
    }
  }
);

/**
 * GET /api/v1/fin-commissions/:id_code
 * Detalhes da comissão
 */
router.get('/:id_code',
  authenticateToken,
  async (req, res) => {
    try {
      const { id_code } = req.params;
      const commission = await FinancialCommission.findOne({
        where: { id_code },
        include: [
          {
            model: Party,
            as: 'commissionSeller',
            attributes: ['id_code', 'name', 'trade_name', 'document', 'email', 'phone']
          }
        ]
      });

      if (!commission) {
        return res.status(404).json({ error: 'Comissão não encontrada' });
      }

      return res.json({
        success: true,
        data: commission
      });
    } catch (error) {
      console.error('Error fetching commission:', error);
      return res.status(500).json({ error: 'Erro ao buscar comissão' });
    }
  }
);

/**
 * POST /api/v1/fin-commissions
 * Criar comissão para corretor
 */
router.post('/',
  authenticateToken,
  requireStoreContext({ allowMissingForRoles: [] }),
  requireStoreAccess,
  [
    body('commission_seller_id').notEmpty().withMessage('Corretor/Vendedor é obrigatório'),
    body('commission_amount').isNumeric().withMessage('Valor da comissão deve ser numérico'),
    body('commission_rate').optional({ nullable: true }).isNumeric().withMessage('Taxa da comissão deve ser numérica')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation error', details: errors.array() });
    }

    try {
      const store = req.store;
      const storeIdCode = store ? store.id_code : req.storeId;

      // Verificar se o corretor existe na filial
      const seller = await Party.findOne({
        where: { id_code: req.body.commission_seller_id }
      });

      if (!seller) {
        return res.status(404).json({ error: 'Corretor/Vendedor não encontrado' });
      }

      const commission = await FinancialCommission.create({
        store_id: storeIdCode,
        source_transaction_id_code: req.body.source_transaction_id_code || null,
        commission_seller_id: req.body.commission_seller_id,
        commission_type: req.body.commission_type || 'percentage',
        commission_rate: req.body.commission_rate || null,
        commission_amount: req.body.commission_amount,
        allow_advance_payment: !!req.body.allow_advance_payment,
        status: req.body.status || 'pending',
        created_by_user_id: req.user.userId
      });

      return res.status(201).json({
        success: true,
        data: commission
      });
    } catch (error) {
      console.error('Error creating commission:', error);
      return res.status(500).json({ error: 'Erro ao criar comissão' });
    }
  }
);

/**
 * PATCH /api/v1/fin-commissions/:id_code/pay
 * Liquidar / pagar comissão
 */
router.patch('/:id_code/pay',
  authenticateToken,
  requireStoreContext({ allowMissingForRoles: [] }),
  requireStoreAccess,
  async (req, res) => {
    try {
      const { id_code } = req.params;
      const commission = await FinancialCommission.findOne({ where: { id_code } });

      if (!commission) {
        return res.status(404).json({ error: 'Comissão não encontrada' });
      }

      commission.status = 'paid';
      commission.paid_at = req.body.paid_at || new Date().toISOString().slice(0, 10);
      commission.paid_bank_account_id = req.body.paid_bank_account_id || null;
      commission.paid_transaction_id_code = req.body.paid_transaction_id_code || null;

      await commission.save();

      return res.json({
        success: true,
        message: 'Comissão marcada como paga com sucesso',
        data: commission
      });
    } catch (error) {
      console.error('Error paying commission:', error);
      return res.status(500).json({ error: 'Erro ao liquidar comissão' });
    }
  }
);

/**
 * PATCH /api/v1/fin-commissions/:id_code/cancel
 * Cancelar comissão
 */
router.patch('/:id_code/cancel',
  authenticateToken,
  requireStoreContext({ allowMissingForRoles: [] }),
  requireStoreAccess,
  async (req, res) => {
    try {
      const { id_code } = req.params;
      const commission = await FinancialCommission.findOne({ where: { id_code } });

      if (!commission) {
        return res.status(404).json({ error: 'Comissão não encontrada' });
      }

      commission.status = 'canceled';
      await commission.save();

      return res.json({
        success: true,
        message: 'Comissão cancelada com sucesso',
        data: commission
      });
    } catch (error) {
      console.error('Error canceling commission:', error);
      return res.status(500).json({ error: 'Erro ao cancelar comissão' });
    }
  }
);

module.exports = router;
