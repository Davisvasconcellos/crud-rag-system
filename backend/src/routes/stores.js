const express = require('express');
const router = express.Router();
const { Store, StoreMember, User, Organization, StoreSchedule, sequelize } = require('../models');
const { authenticateToken } = require('../middlewares/auth');
const { requireStoreContext, requireStoreAccess } = require('../middlewares/storeContext');
const { normalizeStoreSlug } = require('../utils/storeSlug');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');

/**
 * @swagger
 * tags:
 *   name: Stores
 *   description: Gerenciamento de Filiais, Unidades e Matriz
 */

/**
 * GET /api/v1/stores/resolve (PÚBLICO)
 * Resolver filial / vitrine por slug ou subdomínio
 */
router.get('/resolve', async (req, res) => {
  try {
    const raw = req.query.subdomain || req.query.slug;
    const slug = normalizeStoreSlug(raw);

    if (!slug) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'subdomain ou slug é obrigatório'
      });
    }

    const store = await Store.findOne({
      where: { slug, status: 'active' },
      attributes: [
        'id_code', 'name', 'slug', 'legal_name', 'cnpj', 'email', 'phone',
        'address_street', 'address_number', 'address_complement', 'address_neighborhood',
        'city', 'address_state', 'zip_code', 'website', 'instagram_handle',
        'logo_url', 'banner_url', 'status', 'organization_id'
      ],
      include: [
        {
          model: Organization,
          as: 'organization',
          attributes: ['id_code', 'name', 'logo_url', 'banner_url', 'status'],
          required: false
        },
        {
          model: StoreSchedule,
          as: 'schedules',
          attributes: ['day_of_week', 'opening_time', 'closing_time', 'is_open'],
          required: false
        }
      ]
    });

    if (!store) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Filial/Loja não encontrada'
      });
    }

    return res.json({
      success: true,
      data: {
        store: {
          id_code: store.id_code,
          name: store.name,
          slug: store.slug,
          legal_name: store.legal_name,
          cnpj: store.cnpj,
          email: store.email,
          phone: store.phone,
          address: {
            street: store.address_street,
            number: store.address_number,
            complement: store.address_complement,
            neighborhood: store.address_neighborhood,
            city: store.city,
            state: store.address_state,
            zip_code: store.zip_code
          },
          website: store.website,
          instagram: store.instagram_handle,
          logo_url: store.logo_url,
          banner_url: store.banner_url,
          status: store.status,
          schedules: store.schedules || []
        },
        organization: store.organization ? {
          id_code: store.organization.id_code,
          name: store.organization.name,
          logo_url: store.organization.logo_url,
          banner_url: store.organization.banner_url,
          status: store.organization.status
        } : null
      }
    });
  } catch (error) {
    console.error('[Stores] Resolve error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/v1/stores
 * Listar lojas / filiais do usuário ou da plataforma
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
    const offset = (pageNum - 1) * limitNum;

    const where = {};
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    // Se não for master/admin, filtra lojas onde é dono ou membro
    if (!['master', 'admin'].includes(req.user.role)) {
      const userMemberships = await StoreMember.findAll({
        where: { user_id: req.user.userId, status: 'active' },
        attributes: ['store_id']
      });
      const memberStoreIds = userMemberships.map(m => m.store_id);

      where[Op.or] = [
        { owner_id: req.user.userId },
        ...(memberStoreIds.length ? [{ id: { [Op.in]: memberStoreIds } }] : [])
      ];
    }

    const { count, rows } = await Store.findAndCountAll({
      where,
      limit: limitNum,
      offset,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Organization,
          as: 'organization',
          attributes: ['id_code', 'name', 'logo_url']
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id_code', 'name', 'email']
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
  } catch (err) {
    console.error('[Stores] Erro ao listar filiais:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/v1/stores/:id_code
 * Obter detalhes da filial/loja
 */
router.get('/:id_code', authenticateToken, async (req, res) => {
  const { id_code } = req.params;
  try {
    const store = await Store.findOne({
      where: { id_code },
      include: [
        {
          model: Organization,
          as: 'organization',
          attributes: ['id_code', 'name', 'logo_url', 'banner_url']
        },
        {
          model: StoreMember,
          as: 'memberships',
          attributes: ['id_code', 'role', 'status'],
          include: [{ model: User, as: 'user', attributes: ['id_code', 'name', 'email', 'avatar_url'] }]
        },
        {
          model: StoreSchedule,
          as: 'schedules',
          attributes: ['day_of_week', 'opening_time', 'closing_time', 'is_open']
        }
      ]
    });

    if (!store) {
      return res.status(404).json({ error: 'Not Found', message: 'Filial não encontrada' });
    }

    return res.json({
      success: true,
      data: store
    });
  } catch (err) {
    console.error('[Stores] Erro ao buscar filial:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/v1/stores/:id_code/schedules
 * Obter horários de funcionamento / agendamento de visitas da filial
 */
router.get('/:id_code/schedules', async (req, res) => {
  const { id_code } = req.params;
  try {
    const store = await Store.findOne({ where: { id_code } });
    if (!store) {
      return res.status(404).json({ error: 'Not Found', message: 'Filial não encontrada' });
    }

    const schedules = await StoreSchedule.findAll({
      where: { store_id: store.id },
      order: [['day_of_week', 'ASC']]
    });

    return res.json({
      success: true,
      data: schedules
    });
  } catch (err) {
    console.error('[Stores] Erro ao buscar horários:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/v1/stores/:id_code/schedules
 * Salvar horários da filial (0: Domingo a 6: Sábado)
 */
router.put('/:id_code/schedules', authenticateToken, async (req, res) => {
  const { id_code } = req.params;
  const userId = req.user.userId;

  try {
    const store = await Store.findOne({ where: { id_code } });
    if (!store) {
      return res.status(404).json({ error: 'Not Found', message: 'Filial não encontrada' });
    }

    const isAdmin = ['admin', 'master'].includes(req.user.role);
    const isOwner = String(store.owner_id) === String(userId);
    const isManager = await StoreMember.findOne({
      where: { store_id: store.id, user_id: userId, role: 'manager', status: 'active' }
    });

    if (!isAdmin && !isOwner && !isManager) {
      return res.status(403).json({ error: 'Forbidden', message: 'Sem permissão para alterar horários desta filial' });
    }

    const schedulesInput = Array.isArray(req.body.schedules) ? req.body.schedules : [];

    for (const item of schedulesInput) {
      if (item.day_of_week === undefined) continue;

      const [schedule] = await StoreSchedule.findOrCreate({
        where: { store_id: store.id, day_of_week: item.day_of_week },
        defaults: {
          store_id: store.id,
          day_of_week: item.day_of_week,
          opening_time: item.opening_time || null,
          closing_time: item.closing_time || null,
          is_open: !!item.is_open
        }
      });

      schedule.opening_time = item.opening_time || null;
      schedule.closing_time = item.closing_time || null;
      schedule.is_open = !!item.is_open;
      await schedule.save();
    }

    const updated = await StoreSchedule.findAll({
      where: { store_id: store.id },
      order: [['day_of_week', 'ASC']]
    });

    return res.json({
      success: true,
      message: 'Horários atualizados com sucesso',
      data: updated
    });
  } catch (err) {
    console.error('[Stores] Erro ao salvar horários:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/v1/stores/:id_code
 * Atualizar informações da filial
 */
router.put('/:id_code', authenticateToken, async (req, res) => {
  const { id_code } = req.params;
  const userId = req.user.userId;

  try {
    const store = await Store.findOne({ where: { id_code } });
    if (!store) {
      return res.status(404).json({ error: 'Not Found', message: 'Filial não encontrada' });
    }

    const isAdmin = ['admin', 'master'].includes(req.user.role);
    const isOwner = String(store.owner_id) === String(userId);
    const isManager = await StoreMember.findOne({
      where: { store_id: store.id, user_id: userId, role: 'manager', status: 'active' }
    });

    if (!isAdmin && !isOwner && !isManager) {
      return res.status(403).json({ error: 'Forbidden', message: 'Sem permissão para alterar esta filial' });
    }

    const allowedFields = [
      'name', 'email', 'phone', 'cnpj', 'legal_name', 'description',
      'address_street', 'address_number', 'address_complement', 'address_neighborhood',
      'city', 'address_state', 'zip_code', 'capacity', 'website',
      'instagram_handle', 'facebook_handle', 'logo_url', 'banner_url', 'config'
    ];

    allowedFields.forEach(f => {
      if (req.body[f] !== undefined) {
        store[f] = req.body[f];
      }
    });

    await store.save();

    return res.json({
      success: true,
      message: 'Filial atualizada com sucesso',
      data: store
    });
  } catch (err) {
    console.error('[Stores] Erro ao atualizar filial:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
