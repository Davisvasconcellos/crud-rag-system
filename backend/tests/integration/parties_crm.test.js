const request = require('supertest');
const app = require('../../src/server');
const { getTestAdmin, setupTestOrganizationAndStore } = require('../helpers/testHelper');

describe('Integration Test: Parties CRM & Real Estate Contacts', () => {
  let token;
  let adminUser;
  let testStore;
  let createdPartyIdCode;

  beforeAll(async () => {
    const auth = await getTestAdmin();
    token = auth.token;
    adminUser = auth.user;

    const tenant = await setupTestOrganizationAndStore(adminUser);
    testStore = tenant.store;
  });

  test('POST /api/v1/parties creates a new Realtor/Corretor contact', async () => {
    const res = await request(app)
      .post('/api/v1/parties')
      .set('Authorization', `Bearer ${token}`)
      .set('x-store-id', testStore.id_code)
      .send({
        name: 'Roberto Corretor Especialista',
        email: `roberto.${Date.now()}@imoveis.com`,
        document: '555.444.333-22',
        phone: '11999998888',
        is_salesperson: true,
        is_customer: false,
        address_city: 'São Paulo',
        address_state: 'SP'
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id_code).toMatch(/^pty-/);
    expect(res.body.data.is_salesperson).toBe(true);
    expect(res.body.data.document).toBe('55544433322');

    createdPartyIdCode = res.body.data.id_code;
  });

  test('POST /api/v1/parties creates a Property Owner (Proprietário)', async () => {
    const res = await request(app)
      .post('/api/v1/parties')
      .set('Authorization', `Bearer ${token}`)
      .set('x-store-id', testStore.id_code)
      .send({
        name: 'Maria Proprietária de Imóveis',
        email: `maria.${Date.now()}@proprietarios.com`,
        is_owner: true,
        is_customer: false
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.is_owner).toBe(true);
  });

  test('GET /api/v1/parties lists contacts filtered by type=salesperson', async () => {
    const res = await request(app)
      .get('/api/v1/parties?type=salesperson')
      .set('Authorization', `Bearer ${token}`)
      .set('x-store-id', testStore.id_code);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.some(p => p.id_code === createdPartyIdCode)).toBe(true);
  });

  test('GET /api/v1/parties/:id_code retrieves single contact details', async () => {
    const res = await request(app)
      .get(`/api/v1/parties/${createdPartyIdCode}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id_code).toBe(createdPartyIdCode);
    expect(res.body.data.name).toBe('Roberto Corretor Especialista');
  });

  test('PUT /api/v1/parties/:id_code updates contact information', async () => {
    const res = await request(app)
      .put(`/api/v1/parties/${createdPartyIdCode}`)
      .set('Authorization', `Bearer ${token}`)
      .set('x-store-id', testStore.id_code)
      .send({
        name: 'Roberto Corretor Especialista (Sênior)',
        phone: '11977776666'
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Roberto Corretor Especialista (Sênior)');
    expect(res.body.data.phone).toBe('11977776666');
  });

  test('DELETE /api/v1/parties/:id_code inactives contact', async () => {
    const res = await request(app)
      .delete(`/api/v1/parties/${createdPartyIdCode}`)
      .set('Authorization', `Bearer ${token}`)
      .set('x-store-id', testStore.id_code);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
