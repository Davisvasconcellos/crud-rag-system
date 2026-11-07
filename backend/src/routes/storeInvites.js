const crypto = require('crypto');
const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { authenticateToken } = require('../middlewares/auth');
const { requireStoreContext, requireStoreAccess } = require('../middlewares/storeContext');
const { Store, User, StoreInvite, StoreMember, sequelize } = require('../models');

const router = express.Router();

function hashToken(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

/**
 * @swagger
 * tags:
 *   name: Invites
 *   description: Gestão de convites para colaboradores/corretores
 */

/**
 * @swagger
 * /api/v1/store-invites:
 *   get:
 *     summary: Listar convites da filial
 *     tags: [Invites]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authenticateToken, requireStoreContext(), requireStoreAccess, async (req, res) => {
  try {
    const store = req.store;
    const { status } = req.query;

    const whereClause = { store_id: store.id };
    if (status) {
      whereClause.status = status;
    }

    const invites = await StoreInvite.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'createdBy', attributes: ['id_code', 'name', 'email'] },
        { model: User, as: 'acceptedUser', attributes: ['id_code', 'name', 'email'] }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: invites.map(i => ({
        id: i.id_code,
        invited_email: i.invited_email,
        role: i.role,
        permissions: i.permissions,
        status: i.status,
        expires_at: i.expires_at,
        created_at: i.created_at,
        created_by: i.createdBy,
        accepted_at: i.accepted_at,
        accepted_user: i.acceptedUser
      }))
    });
  } catch (err) {
    console.error('[StoreInvites] Erro ao listar:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/store-invites:
 *   post:
 *     summary: Criar novo convite de colaborador
 *     tags: [Invites]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authenticateToken, requireStoreContext(), requireStoreAccess, [
  body('email').isEmail().withMessage('E-mail válido é obrigatório').normalizeEmail(),
  body('role').optional().isIn(['manager', 'collaborator', 'viewer']).withMessage('Papel inválido'),
  body('permissions').optional().isArray()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation error', details: errors.array() });
  }

  const { email, role = 'collaborator', permissions = [] } = req.body;
  const store = req.store;
  const userId = req.user.userId;

  try {
    // 1. Verificar se já é membro ativo
    const targetUser = await User.findOne({ where: { email } });
    if (targetUser) {
      const existingMember = await StoreMember.findOne({
        where: { store_id: store.id, user_id: targetUser.id, status: 'active' }
      });
      if (existingMember) {
        return res.status(400).json({ error: 'Conflict', message: 'Este usuário já é um membro ativo desta filial.' });
      }
    }

    // 2. Gerar token seguro e hash
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashToken(rawToken);

    // Validade: 7 dias
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // 3. Criar Convite
    const invite = await StoreInvite.create({
      store_id: store.id,
      invited_email: email,
      invited_user_id: targetUser ? targetUser.id : null,
      role,
      permissions,
      status: 'pending',
      token_hash: tokenHash,
      expires_at: expiresAt,
      created_by_user_id: userId
    });

    const inviteLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/invites/accept?token=${rawToken}`;

    res.status(201).json({
      success: true,
      message: 'Convite criado com sucesso',
      data: {
        id: invite.id_code,
        invited_email: invite.invited_email,
        role: invite.role,
        status: invite.status,
        expires_at: invite.expires_at,
        token: rawToken,
        invite_link: inviteLink
      }
    });
  } catch (err) {
    console.error('[StoreInvites] Erro ao criar convite:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/store-invites/accept:
 *   post:
 *     summary: Aceitar convite autenticado
 *     tags: [Invites]
 *     security:
 *       - bearerAuth: []
 */
router.post('/accept', authenticateToken, [
  body('token').isString().notEmpty().withMessage('Token do convite é obrigatório')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation error', details: errors.array() });
  }

  const { token } = req.body;
  const userId = req.user.userId;
  const userEmail = req.user.email;

  const t = await sequelize.transaction();

  try {
    const tokenHash = hashToken(token);
    const invite = await StoreInvite.findOne({
      where: { token_hash: tokenHash },
      transaction: t
    });

    if (!invite) {
      await t.rollback();
      return res.status(404).json({ error: 'Not Found', message: 'Convite não encontrado ou inválido' });
    }

    if (invite.status !== 'pending') {
      await t.rollback();
      return res.status(400).json({ error: 'Invalid invite', message: `Este convite já foi ${invite.status}.` });
    }

    if (new Date(invite.expires_at) < new Date()) {
      invite.status = 'expired';
      await invite.save({ transaction: t });
      await t.commit();
      return res.status(400).json({ error: 'Expired invite', message: 'Este convite expirou.' });
    }

    // 1. Atualizar ou Criar StoreMember
    let member = await StoreMember.findOne({
      where: { store_id: invite.store_id, user_id: userId },
      transaction: t
    });

    if (member) {
      member.role = invite.role;
      member.permissions = invite.permissions;
      member.status = 'active';
      await member.save({ transaction: t });
    } else {
      member = await StoreMember.create({
        store_id: invite.store_id,
        user_id: userId,
        invited_email: invite.invited_email,
        role: invite.role,
        permissions: invite.permissions,
        status: 'active'
      }, { transaction: t });
    }

    // 2. Marcar convite como aceito
    invite.status = 'accepted';
    invite.accepted_user_id = userId;
    invite.accepted_at = new Date();
    await invite.save({ transaction: t });

    await t.commit();

    const store = await Store.findByPk(invite.store_id, {
      attributes: ['id_code', 'name', 'slug']
    });

    res.json({
      success: true,
      message: `Você agora faz parte da filial ${store.name}!`,
      data: {
        store_id: store.id_code,
        store_name: store.name,
        role: member.role
      }
    });
  } catch (err) {
    await t.rollback();
    console.error('[StoreInvites] Erro ao aceitar:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/store-invites/{id_code}/revoke:
 *   post:
 *     summary: Revogar um convite
 *     tags: [Invites]
 *     security:
 *       - bearerAuth: []
 */
router.post('/:id_code/revoke', authenticateToken, requireStoreContext(), requireStoreAccess, async (req, res) => {
  const { id_code } = req.params;
  const userId = req.user.userId;
  const store = req.store;

  try {
    const invite = await StoreInvite.findOne({
      where: { id_code, store_id: store.id }
    });

    if (!invite) {
      return res.status(404).json({ error: 'Not Found', message: 'Convite não encontrado' });
    }

    if (invite.status !== 'pending') {
      return res.status(400).json({ error: 'Invalid state', message: `Não é possível revogar um convite com status ${invite.status}.` });
    }

    invite.status = 'revoked';
    invite.revoked_by_user_id = userId;
    invite.revoked_at = new Date();
    await invite.save();

    res.json({
      success: true,
      message: 'Convite revogado com sucesso.'
    });
  } catch (err) {
    console.error('[StoreInvites] Erro ao revogar:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
