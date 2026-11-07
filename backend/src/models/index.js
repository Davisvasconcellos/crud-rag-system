const { sequelize } = require('../config/database');

// Import models
const Plan = require('./Plan');
const User = require('./User');
const TokenBlocklist = require('./TokenBlocklist');
const Organization = require('./Organization');
const Store = require('./Store');
const StoreMember = require('./StoreMember');
const StoreInvite = require('./StoreInvite');
const Party = require('./Party');
const FinancialCommission = require('./FinancialCommission');
const FinRecurrence = require('./FinRecurrence');
const StoreSchedule = require('./StoreSchedule');
const SysModule = require('./SysModule');

// Define associations

// Plan ↔ User
Plan.hasMany(User, { foreignKey: 'plan_id', as: 'users' });
User.belongsTo(Plan, { foreignKey: 'plan_id', as: 'plan' });

// Organization ↔ User (Owner)
Organization.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
User.hasMany(Organization, { foreignKey: 'owner_id', as: 'ownedOrganizations' });

// Organization ↔ Store (Matriz & Filiais)
Organization.hasMany(Store, { foreignKey: 'organization_id', as: 'stores' });
Store.belongsTo(Organization, { foreignKey: 'organization_id', as: 'organization' });

// Store ↔ User (Owner)
Store.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

// StoreMember Associations (Pivot)
Store.hasMany(StoreMember, { foreignKey: 'store_id', as: 'memberships' });
StoreMember.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });

User.hasMany(StoreMember, { foreignKey: 'user_id', as: 'storeMemberships' });
StoreMember.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Many-to-Many Store <-> User via StoreMember
Store.belongsToMany(User, { through: StoreMember, foreignKey: 'store_id', otherKey: 'user_id', as: 'members' });
User.belongsToMany(Store, { through: StoreMember, foreignKey: 'user_id', otherKey: 'store_id', as: 'memberStores' });

// StoreInvite Associations
Store.hasMany(StoreInvite, { foreignKey: 'store_id', as: 'invites' });
StoreInvite.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });

User.hasMany(StoreInvite, { foreignKey: 'created_by_user_id', as: 'createdStoreInvites' });
StoreInvite.belongsTo(User, { foreignKey: 'created_by_user_id', as: 'createdBy' });

User.hasMany(StoreInvite, { foreignKey: 'invited_user_id', as: 'receivedStoreInvites' });
StoreInvite.belongsTo(User, { foreignKey: 'invited_user_id', as: 'invitedUser' });

User.hasMany(StoreInvite, { foreignKey: 'accepted_user_id', as: 'acceptedStoreInvites' });
StoreInvite.belongsTo(User, { foreignKey: 'accepted_user_id', as: 'acceptedUser' });

// Store ↔ StoreSchedule
Store.hasMany(StoreSchedule, { foreignKey: 'store_id', as: 'schedules' });
StoreSchedule.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });

// Store / Organization ↔ Party
Store.hasMany(Party, { foreignKey: 'store_id', sourceKey: 'id_code', as: 'parties' });
Party.belongsTo(Store, { foreignKey: 'store_id', targetKey: 'id_code', as: 'store' });

Organization.hasMany(Party, { foreignKey: 'organization_id', sourceKey: 'id_code', as: 'parties' });
Party.belongsTo(Organization, { foreignKey: 'organization_id', targetKey: 'id_code', as: 'organization' });

// Party ↔ FinancialCommission
FinancialCommission.belongsTo(Party, { foreignKey: 'commission_seller_id', targetKey: 'id_code', as: 'commissionSeller' });
Party.hasMany(FinancialCommission, { foreignKey: 'commission_seller_id', sourceKey: 'id_code', as: 'commissions' });
FinancialCommission.belongsTo(User, { foreignKey: 'created_by_user_id', as: 'createdBy' });
FinancialCommission.belongsTo(Store, { foreignKey: 'store_id', targetKey: 'id_code', as: 'store' });

// Party ↔ FinRecurrence
FinRecurrence.belongsTo(Party, { foreignKey: 'party_id', targetKey: 'id_code', as: 'party' });
Party.hasMany(FinRecurrence, { foreignKey: 'party_id', sourceKey: 'id_code', as: 'recurrences' });
FinRecurrence.belongsTo(User, { foreignKey: 'created_by_user_id', as: 'createdBy' });
FinRecurrence.belongsTo(Store, { foreignKey: 'store_id', targetKey: 'id_code', as: 'store' });

// User ↔ SysModule (sys_user_modules)
User.belongsToMany(SysModule, { through: 'sys_user_modules', foreignKey: 'user_id', otherKey: 'module_id', as: 'modules' });
SysModule.belongsToMany(User, { through: 'sys_user_modules', foreignKey: 'module_id', otherKey: 'user_id', as: 'users' });

module.exports = {
  sequelize,
  Plan,
  User,
  TokenBlocklist,
  Organization,
  Store,
  StoreMember,
  StoreInvite,
  Party,
  FinancialCommission,
  FinRecurrence,
  StoreSchedule,
  SysModule
};
