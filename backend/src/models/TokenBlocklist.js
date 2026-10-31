
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TokenBlocklist = sequelize.define('TokenBlocklist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING(512),
    allowNull: false,
    unique: true
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.getDataValue('expires_at');
    },
    set(value) {
      this.setDataValue('expires_at', value);
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'token_blocklist',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = TokenBlocklist;
