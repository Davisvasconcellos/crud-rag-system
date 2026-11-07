const request = require('supertest');
const app = require('../../src/server');
const { getTestAdmin, setupTestOrganizationAndStore } = require('../helpers/testHelper');
const { User, StoreMember } = require('../../src/models');
const jwt = require('jsonwebtoken');

describe('Integration Test: Store Invites & Multi-Tenant Collaboration', () => {
  let token;
  let adminUser;
  let testStore;
  let invitedToken;

  beforeAll(async () => {
    const auth = await getTestAdmin();
    token = auth.token;
    adminUser = auth.user;

    const tenant = await setupTestOrganizationAndStore(adminUser);
    testStore = tenant.store;
  });

  test('POST /api/v1/store-invites generates a shareable invite with secure token', async () => {
    const inviteEmail = `colaborador.${Date.now()}@realestate.com`;
    const res = await request(app)
      .post('/api/v1/store-invites')
      .set('Authorization', `Bearer ${token}`)
      .set('x-store-id', testStore.id_code)
      .send({
        email: inviteEmail,
        role: 'collaborator',
        permissions: ['crm:read', 'crm:write', 'rentals:read']
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.invited_email).toBe(inviteEmail);
    expect(res.body.data.role).toBe('collaborator');

    invitedToken = res.body.data.token;
  });

  test('POST /api/public/v1/store-invites/resolve resolves invite pre-login', async () => {
    const res = await request(app)
      .post('/api/public/v1/store-invites/resolve')
      .send({ token: invitedToken });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.invite.status).toBe('pending');
    expect(res.body.data.store.id).toBe(testStore.id_code);
    expect(res.body.data.store.name).toBe(testStore.name);
  });

  test('POST /api/v1/store-invites/accept links collaborator to the branch as an active member', async () => {
    // Create new collaborator user with valid ENUM role ('people')
    const collabUser = await User.create({
      name: 'Corretor Novo Convidado',
      email: `corretor.${Date.now()}@teste.com`,
      password: 'CollabPassword123!',
      role: 'people',
      status: 'active'
    });

    const collabToken = jwt.sign(
      { userId: collabUser.id, email: collabUser.email, role: collabUser.role },
      process.env.JWT_SECRET || 'test_jwt_secret',
      { expiresIn: '24h' }
    );

    const res = await request(app)
      .post('/api/v1/store-invites/accept')
      .set('Authorization', `Bearer ${collabToken}`)
      .send({ token: invitedToken });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.store_id).toBe(testStore.id_code);
    expect(res.body.data.role).toBe('collaborator');

    // Verify StoreMember in DB
    const member = await StoreMember.findOne({
      where: { store_id: testStore.id, user_id: collabUser.id }
    });
    expect(member).not.toBeNull();
    expect(member.status).toBe('active');
    expect(member.role).toBe('collaborator');
  });
});
