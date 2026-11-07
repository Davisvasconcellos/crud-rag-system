const crypto = require('crypto');
const express = require('express');
const { body, validationResult } = require('express-validator');
const { Store, StoreInvite, User, Organization } = require('../models');

const router = express.Router();

function hashToken(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

/**
 * @swagger
 * /api/public/v1/store-invites/resolve:
 *   post:
 *     summary: Resolver convite de filial por token (público / pré-login)
 *     tags: [Invites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token]
 *             properties:
 *               token:
 *                 type: string
 */
router.post('/resolve', [
  body('token').isString().notEmpty().withMessage('Token é obrigatório')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation error', details: errors.array() });
  }

  try {
    const tokenHash = hashToken(req.body.token);
    const invite = await StoreInvite.findOne({
      where: { token_hash: tokenHash },
      attributes: ['id_code', 'invited_email', 'status', 'expires_at', 'store_id', 'role']
    });

    if (!invite) {
      return res.status(404).json({ error: 'Not Found', message: 'Convite inválido ou não encontrado' });
    }

    if (invite.status !== 'pending') {
      return res.status(400).json({ error: 'Invalid invite', message: `Este convite já está ${invite.status}.` });
    }

    if (new Date(invite.expires_at) < new Date()) {
      invite.status = 'expired';
      await invite.save();
      return res.status(400).json({ error: 'Expired invite', message: 'Este convite expirou.' });
    }

    const store = await Store.findByPk(invite.store_id, {
      attributes: ['id_code', 'name', 'slug', 'logo_url', 'city', 'address_state'],
      include: [{ model: Organization, as: 'organization', attributes: ['id_code', 'name', 'logo_url'] }]
    });

    if (!store) {
      return res.status(404).json({ error: 'Not Found', message: 'Filial não encontrada' });
    }

    const userExists = !!(await User.findOne({
      where: { email: String(invite.invited_email).toLowerCase() },
      attributes: ['id']
    }));

    return res.json({
      success: true,
      data: {
        invite: {
          id_code: invite.id_code,
          invited_email: invite.invited_email,
          role: invite.role,
          status: invite.status,
          expires_at: invite.expires_at,
          user_exists: userExists
        },
        store: {
          id: store.id_code,
          name: store.name,
          slug: store.slug,
          city: store.city,
          state: store.address_state,
          logo_url: store.logo_url,
          organization: store.organization
        }
      }
    });
  } catch (error) {
    console.error('[PublicInvites] Erro:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
