const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { authenticateToken } = require('../middlewares/auth');
const { requireStoreContext, requireStoreAccess } = require('../middlewares/storeContext');
const { Party, Store, Organization, sequelize } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

/**
 * GET /api/v1/parties
 * Listar contatos / parceiros imobiliários (clientes, locatários, proprietários, corretores, etc)
 */
router.get('/',
  authenticateToken,
  requireStoreContext({ allowMissingForRoles: ['admin', 'master'] }),
  async (req, res) => {
    try {
      const {
        type, // customer, supplier, employee, salesperson, owner
        search,
        status,
        page = 1,
        limit = 20
      } = req.query;

      const where = {};

      if (req.storeId) {
        // req.storeId pode ser id_code ou numérico, normalizamos para o id_code da loja se encontrada
        const store = await Store.findOne({
          where: /^\d+$/.test(req.storeId) ? { id: parseInt(req.storeId, 10) } : { id_code: req.storeId },
          attributes: ['id_code', 'organization_id']
        });
        if (store) {
          where.store_id = store.id_code;
        } else {
          where.store_id = req.storeId;
        }
      }

      if (type) {
        if (type === 'customer') where.is_customer = true;
        if (type === 'supplier') where.is_supplier = true;
        if (type === 'employee') where.is_employee = true;
        if (type === 'salesperson') where.is_salesperson = true;
        if (type === 'owner') where.is_owner = true;
      }

      if (status) {
        where.status = status;
      }

      if (search) {
        where[Op.or] = [
          { name: { [Op.iLike]: `%${search}%` } },
          { trade_name: { [Op.iLike]: `%${search}%` } },
          { document: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
          { phone: { [Op.iLike]: `%${search}%` } },
          { mobile: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const offset = (Math.max(parseInt(page, 10) || 1, 1) - 1) * Math.min(parseInt(limit, 10) || 20, 100);
      const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

      const { count, rows } = await Party.findAndCountAll({
        where,
        order: [['name', 'ASC']],
        limit: limitNum,
        offset
      });

      return res.json({
        success: true,
        data: rows,
        pagination: {
          total: count,
          page: parseInt(page, 10) || 1,
          limit: limitNum,
          pages: Math.ceil(count / limitNum)
        }
      });
    } catch (error) {
      console.error('Error fetching parties:', error);
      return res.status(500).json({ error: 'Erro ao buscar contatos/parceiros' });
    }
  }
);

/**
 * GET /api/v1/parties/:id_code
 * Detalhes de um parceiro
 */
router.get('/:id_code',
  authenticateToken,
  async (req, res) => {
    try {
      const { id_code } = req.params;
      const party = await Party.findOne({ where: { id_code } });

      if (!party) {
        return res.status(404).json({ error: 'Contato/Parceiro não encontrado' });
      }

      return res.json({
        success: true,
        data: party
      });
    } catch (error) {
      console.error('Error fetching party:', error);
      return res.status(500).json({ error: 'Erro ao buscar parceiro' });
    }
  }
);

/**
 * POST /api/v1/parties
 * Criar contato / parceiro
 */
router.post('/',
  authenticateToken,
  requireStoreContext({ allowMissingForRoles: [] }),
  requireStoreAccess,
  [
    body('name').notEmpty().withMessage('Nome é obrigatório').trim(),
    body('email').optional({ nullable: true }).isEmail().withMessage('E-mail inválido'),
    body('document').optional({ nullable: true }).isString().trim(),
    body('phone').optional({ nullable: true }).isString().trim(),
    body('mobile').optional({ nullable: true }).isString().trim()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation error', details: errors.array() });
    }

    try {
      const store = req.store;
      const organizationId = store ? store.organization_id : null;

      const partyData = {
        store_id: store ? store.id_code : req.storeId,
        organization_id: organizationId,
        name: req.body.name,
        trade_name: req.body.trade_name || null,
        document: req.body.document ? req.body.document.replace(/\D/g, '') : null,
        email: req.body.email ? req.body.email.toLowerCase().trim() : null,
        phone: req.body.phone || null,
        mobile: req.body.mobile || null,
        is_customer: req.body.is_customer !== undefined ? !!req.body.is_customer : true,
        is_supplier: !!req.body.is_supplier,
        is_employee: !!req.body.is_employee,
        is_salesperson: !!req.body.is_salesperson,
        is_owner: !!req.body.is_owner,
        zip_code: req.body.zip_code || null,
        address_street: req.body.address_street || null,
        address_number: req.body.address_number || null,
        address_complement: req.body.address_complement || null,
        address_neighborhood: req.body.address_neighborhood || null,
        address_city: req.body.address_city || null,
        address_state: req.body.address_state ? req.body.address_state.toUpperCase() : null,
        notes: req.body.notes || null,
        status: req.body.status || 'active',
        created_by: req.user.userId
      };

      const party = await Party.create(partyData);

      return res.status(201).json({
        success: true,
        data: party
      });
    } catch (error) {
      console.error('Error creating party:', error);
      return res.status(500).json({ error: 'Erro ao criar contato/parceiro' });
    }
  }
);

/**
 * PUT /api/v1/parties/:id_code
 * Atualizar contato / parceiro
 */
router.put('/:id_code',
  authenticateToken,
  requireStoreContext({ allowMissingForRoles: [] }),
  requireStoreAccess,
  async (req, res) => {
    try {
      const { id_code } = req.params;
      const party = await Party.findOne({ where: { id_code } });

      if (!party) {
        return res.status(404).json({ error: 'Contato/Parceiro não encontrado' });
      }

      const updatable = [
        'name', 'trade_name', 'document', 'email', 'phone', 'mobile',
        'is_customer', 'is_supplier', 'is_employee', 'is_salesperson', 'is_owner',
        'zip_code', 'address_street', 'address_number', 'address_complement',
        'address_neighborhood', 'address_city', 'address_state',
        'notes', 'status'
      ];

      for (const field of updatable) {
        if (req.body[field] !== undefined) {
          if (field === 'document' && req.body[field]) {
            party[field] = req.body[field].replace(/\D/g, '');
          } else if (field === 'email' && req.body[field]) {
            party[field] = req.body[field].toLowerCase().trim();
          } else {
            party[field] = req.body[field];
          }
        }
      }

      await party.save();

      return res.json({
        success: true,
        data: party
      });
    } catch (error) {
      console.error('Error updating party:', error);
      return res.status(500).json({ error: 'Erro ao atualizar contato/parceiro' });
    }
  }
);

/**
 * DELETE /api/v1/parties/:id_code
 * Inativa ou remove contato
 */
router.delete('/:id_code',
  authenticateToken,
  requireStoreContext({ allowMissingForRoles: [] }),
  requireStoreAccess,
  async (req, res) => {
    try {
      const { id_code } = req.params;
      const party = await Party.findOne({ where: { id_code } });

      if (!party) {
        return res.status(404).json({ error: 'Contato/Parceiro não encontrado' });
      }

      // Soft disable por padrão
      party.status = 'inactive';
      await party.save();

      return res.json({
        success: true,
        message: 'Contato inativado com sucesso'
      });
    } catch (error) {
      console.error('Error deleting party:', error);
      return res.status(500).json({ error: 'Erro ao remover contato/parceiro' });
    }
  }
);

module.exports = router;
