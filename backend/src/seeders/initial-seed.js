const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { sequelize } = require('../config/database');
const { User, Plan } = require('../models');

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully for seeding.');

    // 1. Criar plano padrão se não existir
    let plan = await Plan.findOne({ where: { name: 'Plano Imobiliário Pro' } });
    if (!plan) {
      plan = await Plan.create({
        name: 'Plano Imobiliário Pro',
        description: 'Acesso completo ao CRM, RAG e Gestão de Imóveis',
        price: 299.90
      });
      console.log('Plano padrão criado:', plan.name);
    }

    // 2. Criar usuário administrador se não existir
    const adminEmail = 'admin@realestate.com';
    let adminUser = await User.findOne({ where: { email: adminEmail } });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Davis Vasconcellos',
        email: adminEmail,
        password: 'Admin@123456',
        role: 'admin',
        phone: '(11) 98765-4321',
        status: 'active',
        email_verified: true,
        plan_id: plan.id,
        plan_start: new Date(),
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      });
      console.log('Usuário admin criado:', adminUser.email, '(Senha: Admin@123456)');
    } else {
      console.log('Usuário admin já existe:', adminUser.email);
    }

    console.log('Seed concluído com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao executar seed:', err);
    process.exit(1);
  }
}

seed();
