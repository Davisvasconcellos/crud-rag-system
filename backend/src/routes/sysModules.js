const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken, requireRole } = require('../middlewares/auth');
const { SysModule, User } = require('../models');

const router = express.Router();

/**
 * GET /api/v1/sys-modules
 * Listar módulos do sistema
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const isMasterOrAdmin = ['admin', 'master'].includes(req.user.role);
    const where = {};

    if (!isMasterOrAdmin || req.query.all !== 'true') {
      where.active = true;
    }

    const modules = await SysModule.findAll({
      where,
      order: [['name', 'ASC']]
    });

    return res.json({
      success: true,
      data: modules
    });
  } catch (error) {
    console.error('List sys_modules error:', error);
    return res.status(500).json({ error: 'Erro ao listar módulos' });
  }
});

/**
 * GET /api/v1/sys-modules/:id_code
 * Detalhes de um módulo
 */
router.get('/:id_code', authenticateToken, async (req, res) => {
  try {
    const mod = await SysModule.findOne({ where: { id_code: req.params.id_code } });
    if (!mod) {
      return res.status(404).json({ error: 'Módulo não encontrado' });
    }
    return res.json({ success: true, data: mod });
  } catch (error) {
    console.error('Get sys_module error:', error);
    return res.status(500).json({ error: 'Erro ao buscar módulo' });
  }
});

/**
 * POST /api/v1/sys-modules
 * Criar novo módulo (Admin/Master)
 */
router.post(
  '/',
  authenticateToken,
  requireRole('admin', 'master'),
  [
    body('name').notEmpty().withMessage('Nome é obrigatório').trim(),
    body('slug').notEmpty().withMessage('Slug é obrigatório').trim()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation error', details: errors.array() });
    }

    try {
      const slug = String(req.body.slug).toLowerCase().trim();
      const existing = await SysModule.findOne({ where: { slug } });
      if (existing) {
        return res.status(409).json({ error: 'Slug já existe' });
      }

      const mod = await SysModule.create({
        name: req.body.name,
        slug,
        description: req.body.description || null,
        home_path: req.body.home_path || null,
        active: req.body.active !== undefined ? !!req.body.active : true
      });

      return res.status(201).json({
        success: true,
        data: mod
      });
    } catch (error) {
      console.error('Create sys_module error:', error);
      return res.status(500).json({ error: 'Erro ao criar módulo' });
    }
  }
);

/**
 * PUT /api/v1/sys-modules/:id_code
 * Atualizar módulo (Admin/Master)
 */
router.put(
  '/:id_code',
  authenticateToken,
  requireRole('admin', 'master'),
  async (req, res) => {
    try {
      const mod = await SysModule.findOne({ where: { id_code: req.params.id_code } });
      if (!mod) {
        return res.status(404).json({ error: 'Módulo não encontrado' });
      }

      if (req.body.name) mod.name = req.body.name;
      if (req.body.description !== undefined) mod.description = req.body.description;
      if (req.body.home_path !== undefined) mod.home_path = req.body.home_path;
      if (req.body.active !== undefined) mod.active = !!req.body.active;

      await mod.save();

      return res.json({
        success: true,
        data: mod
      });
    } catch (error) {
      console.error('Update sys_module error:', error);
      return res.status(500).json({ error: 'Erro ao atualizar módulo' });
    }
  }
);

module.exports = router;
