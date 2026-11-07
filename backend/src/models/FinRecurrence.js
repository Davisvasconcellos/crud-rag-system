const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const FinRecurrence = sequelize.define('FinRecurrence', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_code: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  store_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Stores the id_code of the store'
  },
  type: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'RECEIVABLE' // PAYABLE, RECEIVABLE, TRANSFER
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Estimated or fixed recurring amount'
  },
  frequency: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'monthly' // weekly, monthly, yearly
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'active' // active, paused, finished
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  next_due_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  day_of_month: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  party_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Party id_code (e.g. tenant, owner, supplier)'
  },
  category_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  cost_center_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  created_by_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  updated_by_user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'financial_recurrences',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeValidate: (recurrence) => {
      if (!recurrence.id_code) {
        recurrence.id_code = `rec-${uuidv4()}`;
      }
    }
  }
});

module.exports = FinRecurrence;
