const request = require('supertest');
const app = require('../../src/server');
const { getTestAdmin, setupTestOrganizationAndStore } = require('../helpers/testHelper');
const { Party } = require('../../src/models');

describe('Integration Test: Financial Commissions & Rental Recurrences', () => {
  let token;
  let adminUser;
  let testStore;
  let realtorParty;

  beforeAll(async () => {
    const auth = await getTestAdmin();
    token = auth.token;
    adminUser = auth.user;

    const tenant = await setupTestOrganizationAndStore(adminUser);
    testStore = tenant.store;

    realtorParty = await Party.create({
      store_id: testStore.id_code,
      name: 'Corretor Comissão Teste',
      is_salesperson: true,
      created_by: adminUser.id
    });
  });

  describe('Financial Commissions', () => {
    let createdCommissionIdCode;

    test('POST /api/v1/fin-commissions creates commission for realtor on deal', async () => {
      const res = await request(app)
        .post('/api/v1/fin-commissions')
        .set('Authorization', `Bearer ${token}`)
        .set('x-store-id', testStore.id_code)
        .send({
          commission_seller_id: realtorParty.id_code,
          commission_type: 'percentage',
          commission_rate: 6.0,
          commission_amount: 24000.00,
          allow_advance_payment: false
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id_code).toMatch(/^com-/);
      expect(res.body.data.status).toBe('pending');
      expect(Number(res.body.data.commission_amount)).toBe(24000);

      createdCommissionIdCode = res.body.data.id_code;
    });

    test('GET /api/v1/fin-commissions returns summary with counts and amounts', async () => {
      const res = await request(app)
        .get('/api/v1/fin-commissions')
        .set('Authorization', `Bearer ${token}`)
        .set('x-store-id', testStore.id_code);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.summary).toBeDefined();
      expect(res.body.summary.pending.count).toBeGreaterThanOrEqual(1);
      expect(res.body.summary.pending.amount).toBeGreaterThanOrEqual(24000);
    });

    test('PATCH /api/v1/fin-commissions/:id_code/pay marks commission as paid', async () => {
      const res = await request(app)
        .patch(`/api/v1/fin-commissions/${createdCommissionIdCode}/pay`)
        .set('Authorization', `Bearer ${token}`)
        .set('x-store-id', testStore.id_code)
        .send({
          paid_at: '2026-05-15',
          paid_bank_account_id: 'ITAU_AG_001'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('paid');
      expect(res.body.data.paid_at).toBe('2026-05-15');
    });
  });

  describe('Rental Recurrences (Locações)', () => {
    let createdRecurrenceIdCode;

    test('POST /api/v1/fin-recurrences creates monthly rental contract', async () => {
      const res = await request(app)
        .post('/api/v1/fin-recurrences')
        .set('Authorization', `Bearer ${token}`)
        .set('x-store-id', testStore.id_code)
        .send({
          description: 'Contrato de Locação - Cobertura Jardins',
          amount: 5500.00,
          frequency: 'monthly',
          day_of_month: 10,
          start_date: '2026-06-01',
          party_id: realtorParty.id_code
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id_code).toMatch(/^rec-/);
      expect(res.body.data.next_due_date).toBe('2026-06-10');
      expect(res.body.data.status).toBe('active');

      createdRecurrenceIdCode = res.body.data.id_code;
    });

    test('PATCH /api/v1/fin-recurrences/:id_code/advance rolls due date to next month', async () => {
      const res = await request(app)
        .patch(`/api/v1/fin-recurrences/${createdRecurrenceIdCode}/advance`)
        .set('Authorization', `Bearer ${token}`)
        .set('x-store-id', testStore.id_code);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.next_due_date).toBe('2026-07-10');
    });

    test('GET /api/v1/fin-recurrences lists active rentals', async () => {
      const res = await request(app)
        .get('/api/v1/fin-recurrences?status=active')
        .set('Authorization', `Bearer ${token}`)
        .set('x-store-id', testStore.id_code);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.some(r => r.id_code === createdRecurrenceIdCode)).toBe(true);
    });
  });
});
