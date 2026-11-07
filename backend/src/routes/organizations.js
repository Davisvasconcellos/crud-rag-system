const express = require('express');
const router = express.Router();
const { Organization, Store, StoreMember, User, sequelize } = require('../models');
const { authenticateToken } = require('../middlewares/auth');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const { normalizeStoreSlug, isReservedStoreSlug } = require('../utils/storeSlug');

/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Gerenciamento de Organizações (Tenants / Holdings) e Filiais
 */

/**
 * @swagger
 * /api/v1/organizations/me:
 *   get:
 *     summary: Obter contexto de organizações e filiais do usuário logado
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de organizações e filiais acessíveis
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1. Organizações que o usuário é dono
    const ownedOrgs = await Organization.findAll({
      where: { owner_id: userId, status: 'active' },
      include: [
        {
          model: Store,
          as: 'stores',
          attributes: ['id', 'id_code', 'name', 'slug', 'logo_url', 'banner_url', 'status', 'config', 'city', 'address_state']
        }
      ]
    });

    // 2. Filiais onde o usuário é membro colaborador/gerente
    const memberships = await StoreMember.findAll({
      where: { user_id: userId, status: 'active' },
      include: [
        {
          model: Store,
          as: 'store',
          include: [
            {
              model: Organization,
              as: 'organization',
              attributes: ['id', 'id_code', 'name', 'logo_url', 'banner_url']
            }
          ]
        }
      ]
    });

    const result = {
      owned_organizations: ownedOrgs.map(o => ({
        id: o.id_code,
        name: o.name,
        document: o.document,
        plan: o.plan_tier,
        logo_url: o.logo_url,
        banner_url: o.banner_url,
        stores: o.stores.map(s => ({
          id: s.id_code,
          name: s.name,
          slug: s.slug,
          is_default: s.config?.default || false,
          city: s.city,
          state: s.address_state,
          logo_url: s.logo_url,
          banner_url: s.banner_url
        }))
      })),
      memberships: memberships.map(m => ({
        store_id: m.store.id_code,
        store_name: m.store.name,
        organization_name: m.store.organization?.name || '',
        organization_id: m.store.organization?.id_code || '',
        role: m.role,
        permissions: m.permissions
      }))
    };

    res.json({ success: true, data: result });
  } catch (err) {
    console.error('[Organizations] Error fetching user context:', err);
    res.status(500).json({ error: 'Internal server error', message: 'Erro ao carregar organizações' });
  }
});

/**
 * @swagger
 * /api/v1/organizations:
 *   post:
 *     summary: Criar nova organização (Gera automaticamente a Matriz)
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               document:
 *                 type: string
 *               logo_url:
 *                 type: string
 *               banner_url:
 *                 type: string
 */
router.post('/', authenticateToken, [
  body('name').isString().notEmpty().withMessage('Nome da organização é obrigatório'),
  body('document').optional().isString(),
  body('logo_url').optional({ nullable: true }).isString(),
  body('banner_url').optional({ nullable: true }).isString()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation error', details: errors.array() });
  }

  const { name, document, logo_url, banner_url } = req.body;
  const userId = req.user.userId;

  const t = await sequelize.transaction();

  try {
    // 1. Criar Organização
    const org = await Organization.create({
      owner_id: userId,
      name,
      document: document || null,
      logo_url: logo_url || null,
      banner_url: banner_url || null,
      plan_tier: 'free',
      status: 'active'
    }, { transaction: t });

    // 2. Criar Matriz Padrão
    const storeName = `${name} (Matriz)`;
    const baseSlug = normalizeStoreSlug(name);
    const slug = baseSlug ? `${baseSlug}-${uuidv4().substring(0, 8)}` : `store-${uuidv4().substring(0, 8)}`;

    const store = await Store.create({
      organization_id: org.id,
      owner_id: userId,
      name: storeName,
      slug: slug,
      logo_url: logo_url || null,
      banner_url: banner_url || null,
      config: { default: true },
      status: 'active'
    }, { transaction: t });

    // 3. Adicionar o Criador como Manager da Matriz com permissão total
    await StoreMember.create({
      store_id: store.id,
      user_id: userId,
      role: 'manager',
      permissions: ['*'],
      status: 'active'
    }, { transaction: t });

    await t.commit();

    res.status(201).json({
      success: true,
      message: 'Organização e Matriz criadas com sucesso',
      data: {
        organization: {
          id: org.id_code,
          name: org.name,
          document: org.document,
          plan: org.plan_tier,
          logo_url: org.logo_url
        },
        store: {
          id: store.id_code,
          name: store.name,
          slug: store.slug
        }
      }
    });
  } catch (err) {
    await t.rollback();
    console.error('[Organizations] Erro ao criar organização:', err);
    res.status(500).json({ error: 'Internal server error', message: 'Erro ao criar organização' });
  }
});

/**
 * @swagger
 * /api/v1/organizations/{id_code}/stores:
 *   get:
 *     summary: Listar filiais de uma organização
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id_code/stores', authenticateToken, async (req, res) => {
  const { id_code } = req.params;
  const userId = req.user.userId;

  try {
    const org = await Organization.findOne({ where: { id_code } });
    if (!org) {
      return res.status(404).json({ error: 'Not Found', message: 'Organização não encontrada' });
    }

    const isOwner = String(org.owner_id) === String(userId);
    const isAdmin = ['admin', 'master'].includes(req.user.role);

    let allowedStoreIds = null;
    if (!isOwner && !isAdmin) {
      const memberships = await StoreMember.findAll({
        where: { user_id: userId, status: 'active' },
        include: [{
          model: Store,
          as: 'store',
          where: { organization_id: org.id },
          attributes: ['id']
        }]
      });

      if (memberships.length === 0) {
        return res.status(403).json({ error: 'Forbidden', message: 'Sem permissão para visualizar lojas desta organização' });
      }
      allowedStoreIds = memberships.map(m => m.store.id);
    }

    const whereClause = { organization_id: org.id, status: 'active' };
    if (allowedStoreIds) {
      whereClause.id = allowedStoreIds;
    }

    const stores = await Store.findAll({
      where: whereClause,
      order: [['created_at', 'ASC']]
    });

    res.json({
      success: true,
      data: stores.map(s => ({
        id: s.id_code,
        name: s.name,
        slug: s.slug,
        is_default: s.config?.default || false,
        email: s.email,
        phone: s.phone,
        city: s.city,
        state: s.address_state,
        address: s.address,
        logo_url: s.logo_url,
        status: s.status
      }))
    });
  } catch (err) {
    console.error('[Organizations] Erro ao listar lojas:', err);
    res.status(500).json({ error: 'Internal server error', message: 'Erro ao listar filiais' });
  }
});

/**
 * @swagger
 * /api/v1/organizations/{id_code}/stores:
 *   post:
 *     summary: Criar nova filial dentro da organização
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 */
router.post('/:id_code/stores', authenticateToken, [
  body('name').isString().notEmpty().withMessage('Nome da filial é obrigatório'),
  body('email').optional({ nullable: true }).isEmail(),
  body('phone').optional({ nullable: true }).isString(),
  body('cnpj').optional({ nullable: true }).isString(),
  body('city').optional({ nullable: true }).isString(),
  body('address_state').optional({ nullable: true }).isString()
], async (req, res) => {
  const { id_code } = req.params;
  const userId = req.user.userId;

  const t = await sequelize.transaction();

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      await t.rollback();
      return res.status(400).json({ error: 'Validation error', details: errors.array() });
    }

    const org = await Organization.findOne({ where: { id_code } });
    if (!org) {
      await t.rollback();
      return res.status(404).json({ error: 'Not Found', message: 'Organização não encontrada' });
    }

    const isOwner = String(org.owner_id) === String(userId);
    const isAdmin = ['admin', 'master'].includes(req.user.role);

    if (!isOwner && !isAdmin) {
      await t.rollback();
      return res.status(403).json({ error: 'Forbidden', message: 'Apenas o proprietário da organização pode criar novas filiais.' });
    }

    const {
      name, email, phone, cnpj, legal_name,
      address_street, address_neighborhood, city, address_state,
      address_number, address_complement, zip_code,
      capacity, description, website, instagram_handle, facebook_handle,
      latitude, longitude, slug: rawSlug, logo_url, banner_url
    } = req.body;

    let slug = rawSlug ? normalizeStoreSlug(rawSlug) : normalizeStoreSlug(name);
    if (!slug) {
      slug = `store-${uuidv4().slice(0, 8)}`;
    }
    if (isReservedStoreSlug(slug)) {
      await t.rollback();
      return res.status(400).json({ error: 'Validation error', message: 'Slug reservado/inválido' });
    }

    const existingSlug = await Store.findOne({ where: { slug }, transaction: t });
    if (existingSlug) {
      slug = `${slug}-${uuidv4().slice(0, 6)}`;
    }

    const store = await Store.create({
      organization_id: org.id,
      owner_id: userId,
      name,
      slug,
      email: email || null,
      phone: phone || null,
      cnpj: cnpj || null,
      legal_name: legal_name || null,
      address_street: address_street || null,
      address_neighborhood: address_neighborhood || null,
      city: city || null,
      address_state: address_state || null,
      address_number: address_number || null,
      address_complement: address_complement || null,
      zip_code: zip_code || null,
      address: address_street ? `${address_street}, ${address_number || ''} - ${city || ''}` : null,
      capacity: capacity || null,
      description: description || null,
      website: website || null,
      instagram_handle: instagram_handle || null,
      facebook_handle: facebook_handle || null,
      latitude: latitude || null,
      longitude: longitude || null,
      logo_url: logo_url || null,
      banner_url: banner_url || null,
      config: { default: false },
      status: 'active'
    }, { transaction: t });

    // Vincular o criador como Manager da filial
    await StoreMember.create({
      store_id: store.id,
      user_id: userId,
      role: 'manager',
      permissions: ['*'],
      status: 'active'
    }, { transaction: t });

    await t.commit();

    res.status(201).json({
      success: true,
      message: 'Filial criada com sucesso',
      data: {
        id: store.id_code,
        name: store.name,
        slug: store.slug,
        organization_id: org.id_code
      }
    });
  } catch (err) {
    await t.rollback();
    console.error('[Organizations] Erro ao criar filial:', err);
    res.status(500).json({ error: 'Internal server error', message: 'Erro ao criar filial' });
  }
});

/**
 * @swagger
 * /api/v1/organizations/{id_code}:
 *   put:
 *     summary: Atualizar dados da organização
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id_code', authenticateToken, [
  body('name').optional().isString().notEmpty(),
  body('document').optional().isString(),
  body('logo_url').optional({ nullable: true }).isString(),
  body('banner_url').optional({ nullable: true }).isString()
], async (req, res) => {
  const { id_code } = req.params;
  const userId = req.user.userId;

  try {
    const org = await Organization.findOne({ where: { id_code } });
    if (!org) {
      return res.status(404).json({ error: 'Not Found', message: 'Organização não encontrada' });
    }

    const isOwner = String(org.owner_id) === String(userId);
    const isAdmin = ['admin', 'master'].includes(req.user.role);
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Forbidden', message: 'Sem permissão para alterar esta organização' });
    }

    const { name, document, logo_url, banner_url } = req.body;
    if (name) org.name = name;
    if (document !== undefined) org.document = document;
    if (logo_url !== undefined) org.logo_url = logo_url;
    if (banner_url !== undefined) org.banner_url = banner_url;

    await org.save();

    res.json({
      success: true,
      message: 'Organização atualizada com sucesso',
      data: {
        id: org.id_code,
        name: org.name,
        document: org.document,
        logo_url: org.logo_url,
        banner_url: org.banner_url
      }
    });
  } catch (err) {
    console.error('[Organizations] Erro ao atualizar:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
