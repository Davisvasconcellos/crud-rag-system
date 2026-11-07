/**
 * Service to calculate and advance recurring due dates (e.g. monthly rents, condo fees, administration retainers)
 */

/**
 * Calculate the next due date based on frequency and current date
 * @param {Date|string} currentDate 
 * @param {'weekly'|'monthly'|'yearly'} frequency 
 * @param {number} dayOfMonth 
 * @returns {string} YYYY-MM-DD
 */
const calculateNextDueDate = (currentDate, frequency = 'monthly', dayOfMonth = 1) => {
  const date = new Date(typeof currentDate === 'string' && !currentDate.includes('T') ? `${currentDate}T00:00:00Z` : currentDate);

  if (frequency === 'weekly') {
    date.setUTCDate(date.getUTCDate() + 7);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } else if (frequency === 'monthly') {
    let targetYear = date.getUTCFullYear();
    let targetMonth = date.getUTCMonth() + 1;
    if (targetMonth > 11) {
      targetYear += Math.floor(targetMonth / 12);
      targetMonth = targetMonth % 12;
    }
    const daysInTargetMonth = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
    const safeDay = Math.min(dayOfMonth || date.getUTCDate(), daysInTargetMonth);
    const resultDate = new Date(Date.UTC(targetYear, targetMonth, safeDay));
    const year = resultDate.getUTCFullYear();
    const month = String(resultDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(resultDate.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } else if (frequency === 'yearly') {
    date.setUTCFullYear(date.getUTCFullYear() + 1);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Normalizes a candidate due date ensuring it respects the preferred day of the month without skipping
 * @param {string|Date} nextDueDate
 * @param {'weekly'|'monthly'|'yearly'} frequency
 * @param {number} dayOfMonth
 * @returns {string} YYYY-MM-DD
 */
const normalizeDueDate = (nextDueDate, frequency = 'monthly', dayOfMonth = 1) => {
  if (!nextDueDate) return null;
  const str = String(nextDueDate).slice(0, 10);
  if (frequency !== 'monthly') return str;

  const base = new Date(`${str}T00:00:00Z`);
  const baseYear = base.getUTCFullYear();
  const baseMonth = base.getUTCMonth();
  const targetDay = Math.max(1, Math.min(parseInt(dayOfMonth, 10) || 1, 31));
  const daysThisMonth = new Date(Date.UTC(baseYear, baseMonth + 1, 0)).getUTCDate();
  const dayThisMonth = Math.min(targetDay, daysThisMonth);

  const year = baseYear;
  const month = String(baseMonth + 1).padStart(2, '0');
  const day = String(dayThisMonth).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

module.exports = {
  calculateNextDueDate,
  normalizeDueDate
};
