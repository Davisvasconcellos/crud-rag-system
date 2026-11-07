'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. financial_parties (CRM Contacts, Clients, Owners, Brokers, Suppliers)
    await queryInterface.createTable('financial_parties', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_code: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      store_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Store id_code'
      },
      organization_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Organization id_code'
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      trade_name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      document: {
        type: Sequelize.STRING(20),
        allowNull: true,
        comment: 'CPF ou CNPJ'
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      mobile: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      is_customer: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_supplier: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_employee: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_salesperson: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: 'Corretor de imóveis'
      },
      is_owner: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: 'Proprietário do imóvel'
      },
      zip_code: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      address_street: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      address_number: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      address_complement: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      address_neighborhood: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      address_city: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      address_state: {
        type: Sequelize.STRING(2),
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'active'
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('financial_parties', ['store_id']);
    await queryInterface.addIndex('financial_parties', ['organization_id']);
    await queryInterface.addIndex('financial_parties', ['document']);

    // 2. financial_commissions (Broker & Agency Commissions)
    await queryInterface.createTable('financial_commissions', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_code: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      store_id: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      source_transaction_id_code: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      commission_seller_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Party id_code of salesperson/broker'
      },
      commission_type: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'percentage'
      },
      commission_rate: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: true
      },
      commission_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      allow_advance_payment: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'pending'
      },
      paid_transaction_id_code: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      paid_bank_account_id: {
        type: Sequelize.STRING(64),
        allowNull: true
      },
      paid_at: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      created_by_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('financial_commissions', ['store_id']);
    await queryInterface.addIndex('financial_commissions', ['commission_seller_id']);
    await queryInterface.addIndex('financial_commissions', ['status']);

    // 3. financial_recurrences (Rentals, Condominium fees, Management retainers)
    await queryInterface.createTable('financial_recurrences', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_code: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      store_id: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      type: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'RECEIVABLE'
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      frequency: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'monthly'
      },
      status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'active'
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      next_due_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      day_of_month: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      party_id: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      category_id: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      cost_center_id: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      created_by_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      updated_by_user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('financial_recurrences', ['store_id']);
    await queryInterface.addIndex('financial_recurrences', ['party_id']);
    await queryInterface.addIndex('financial_recurrences', ['status']);
    await queryInterface.addIndex('financial_recurrences', ['next_due_date']);

    // 4. store_schedules (Branch opening hours & visit slots)
    await queryInterface.createTable('store_schedules', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stores',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      day_of_week: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '0: Domingo, 1: Segunda, ..., 6: Sábado'
      },
      opening_time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      closing_time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      is_open: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('store_schedules', ['store_id', 'day_of_week'], { unique: true });

    // 5. sys_modules (Modular feature flags & entitlements)
    await queryInterface.createTable('sys_modules', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_code: {
        type: Sequelize.STRING(36),
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      home_path: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // 6. sys_user_modules (User-module permissions pivot)
    await queryInterface.createTable('sys_user_modules', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      module_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sys_modules',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('sys_user_modules', ['user_id', 'module_id'], { unique: true });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('sys_user_modules');
    await queryInterface.dropTable('sys_modules');
    await queryInterface.dropTable('store_schedules');
    await queryInterface.dropTable('financial_recurrences');
    await queryInterface.dropTable('financial_commissions');
    await queryInterface.dropTable('financial_parties');
  }
};
