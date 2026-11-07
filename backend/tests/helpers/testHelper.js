const jwt = require('jsonwebtoken');
const { User, Organization, Store, StoreMember, Plan } = require('../../src/models');

/**
 * Returns a valid JWT token for the specified user or creates a test admin
 */
async function getTestAdmin() {
  let user = await User.findOne({ where: { email: 'admin@realestate.com' } });
  if (!user) {
    let plan = await Plan.findOne();
    if (!plan) {
      plan = await Plan.create({
        name: 'Plano Pro Teste',
        description: 'Plano para testes',
        price: 199.90
      });
    }

    user = await User.create({
      name: 'Admin Test Suite',
      email: 'admin@realestate.com',
      password: 'AdminPassword123!',
      role: 'admin',
      plan_id: plan.id,
      status: 'active'
    });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
      planId: user.plan_id
    },
    process.env.JWT_SECRET || 'test_jwt_secret',
    { expiresIn: '24h' }
  );

  return { user, token };
}

/**
 * Ensures an organization and store exist for tests using findOrCreate
 */
async function setupTestOrganizationAndStore(user) {
  const [org] = await Organization.findOrCreate({
    where: { name: 'Imobiliária Teste Automatizado' },
    defaults: {
      name: 'Imobiliária Teste Automatizado',
      owner_id: user.id
    }
  });

  const [store] = await Store.findOrCreate({
    where: { slug: 'teste-filial-principal' },
    defaults: {
      organization_id: org.id,
      owner_id: user.id,
      name: 'Filial Principal Teste',
      slug: 'teste-filial-principal',
      city: 'São Paulo',
      address_state: 'SP',
      status: 'active'
    }
  });

  return { org, store };
}

module.exports = {
  getTestAdmin,
  setupTestOrganizationAndStore
};
