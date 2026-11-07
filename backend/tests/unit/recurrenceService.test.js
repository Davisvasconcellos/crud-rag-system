const { calculateNextDueDate, normalizeDueDate } = require('../../src/services/recurrenceService');

describe('Unit Test: recurrenceService for rental contracts', () => {
  test('calculateNextDueDate advances monthly payments adhering to day of month', () => {
    const nextDate = calculateNextDueDate('2026-05-10', 'monthly', 10);
    expect(nextDate).toBe('2026-06-10');

    const nextDate2 = calculateNextDueDate('2026-12-15', 'monthly', 15);
    expect(nextDate2).toBe('2027-01-15');
  });

  test('calculateNextDueDate handles month-end overflow gracefully (e.g., Jan 31 -> Feb 28)', () => {
    const febDate = calculateNextDueDate('2026-01-31', 'monthly', 31);
    expect(febDate).toBe('2026-02-28');
  });

  test('calculateNextDueDate advances weekly payments by exactly 7 days', () => {
    const nextWeekly = calculateNextDueDate('2026-05-01', 'weekly');
    expect(nextWeekly).toBe('2026-05-08');
  });

  test('calculateNextDueDate advances yearly contracts by 1 year', () => {
    const nextYearly = calculateNextDueDate('2026-05-10', 'yearly');
    expect(nextYearly).toBe('2027-05-10');
  });

  test('normalizeDueDate sets the correct day of month without skipping months', () => {
    expect(normalizeDueDate('2026-05-01', 'monthly', 15)).toBe('2026-05-15');
    expect(normalizeDueDate('2026-02-10', 'monthly', 31)).toBe('2026-02-28');
  });
});
