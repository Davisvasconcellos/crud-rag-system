const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { sequelize } = require('../config/database');
const { SysModule } = require('../models');

async function seedModules() {
  try {
    await sequelize.authenticate();
    console.log('Database connected for modules seed.');

    const modules = [
      {
        slug: 'crm',
        name: 'CRM Imobiliário & Contatos',
        description: 'Gestão unificada de clientes, locatários, proprietários e corretores',
        home_path: '/admin/parties',
        active: true
      },
      {
        slug: 'rentals',
        name: 'Locações & Recorrências',
        description: 'Contratos de locação, gestão de aluguéis e taxas de condomínio',
        home_path: '/admin/rentals',
        active: true
      },
      {
        slug: 'commissions',
        name: 'Comissões de Corretores',
        description: 'Controle de comissões sobre vendas e locações de imóveis',
        home_path: '/admin/commissions',
        active: true
      },
      {
        slug: 'rag',
        name: 'RAG & Inteligência Artificial',
        description: 'Busca semântica em documentos de imóveis, contratos e chat assistente com citações',
        home_path: '/admin/rag',
        active: true
      },
      {
        slug: 'financial',
        name: 'Financeiro Imobiliário',
        description: 'Contas a pagar, a receber e conciliação bancária',
        home_path: '/admin/financial',
        active: true
      },
      {
        slug: 'drive',
        name: 'Google Drive Multi-Tenant',
        description: 'Armazenamento em nuvem isolado por organização e filial',
        home_path: '/admin/files',
        active: true
      }
    ];

    for (const mod of modules) {
      const [record, created] = await SysModule.findOrCreate({
        where: { slug: mod.slug },
        defaults: mod
      });
      if (created) {
        console.log(`Módulo criado: ${mod.name} (${mod.slug})`);
      } else {
        console.log(`Módulo já existente: ${mod.name} (${mod.slug})`);
      }
    }

    console.log('Seed de módulos concluído com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao executar seed de módulos:', err);
    process.exit(1);
  }
}

seedModules();
