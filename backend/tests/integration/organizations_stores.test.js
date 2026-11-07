const request = require('supertest');
const app = require('../../src/server');
const { getTestAdmin, setupTestOrganizationAndStore } = require('../helpers/testHelper');

describe('Integration Test: Organizations & Stores (Multi-Tenant)', () => {
  let token;
  let adminUser;
  let testStore;

  beforeAll(async () => {
    const auth = await getTestAdmin();
    token = auth.token;
    adminUser = auth.user;

    const tenant = await setupTestOrganizationAndStore(adminUser);
    testStore = tenant.store;
  });

  test('POST /api/v1/organizations creates organization and auto-generates default Matriz', async () => {
    const uniqueName = `Org Teste AutoMatriz ${Date.now()}`;
    const res = await request(app)
      .post('/api/v1/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: uniqueName
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.organization.name).toBe(uniqueName);
    expect(res.body.data.store).toBeDefined();
    expect(res.body.data.store.name).toBe(`${uniqueName} (Matriz)`);
  });

  test('GET /api/v1/organizations/me lists owned organizations and stores', async () => {
    const res = await request(app)
      .get('/api/v1/organizations/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data.owned_organizations)).toBe(true);
  });

  test('GET /api/v1/stores/resolve resolves filial vitrine publicly by slug', async () => {
    const res = await request(app)
      .get(`/api/v1/stores/resolve?slug=${testStore.slug}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.store.id_code).toBe(testStore.id_code);
    expect(res.body.data.store.name).toBe(testStore.name);
    expect(res.body.data.organization).toBeDefined();
  });

  test('PUT /api/v1/stores/:id_code/schedules sets branch visiting and opening hours', async () => {
    const schedulesPayload = [
      { day_of_week: 1, opening_time: '08:00', closing_time: '18:00', is_open: true },
      { day_of_week: 6, opening_time: '09:00', closing_time: '14:00', is_open: true }
    ];

    const res = await request(app)
      .put(`/api/v1/stores/${testStore.id_code}/schedules`)
      .set('Authorization', `Bearer ${token}`)
      .send({ schedules: schedulesPayload });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
  });
});
