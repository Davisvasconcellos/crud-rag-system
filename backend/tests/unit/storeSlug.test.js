const { normalizeStoreSlug, isReservedStoreSlug } = require('../../src/utils/storeSlug');

describe('Unit Test: storeSlug utility', () => {
  test('normalizeStoreSlug removes accents and special characters', () => {
    expect(normalizeStoreSlug('Imobiliária São Paulo - Jardins & Cia')).toBe('imobiliaria-sao-paulo-jardins-cia');
    expect(normalizeStoreSlug('   Filial #01 Copacabana!!!  ')).toBe('filial-01-copacabana');
    expect(normalizeStoreSlug('Apto 101/Bloco B')).toBe('apto-101-bloco-b');
  });

  test('normalizeStoreSlug handles empty, null or undefined values safely', () => {
    expect(normalizeStoreSlug('')).toBe('');
    expect(normalizeStoreSlug(null)).toBe('');
    expect(normalizeStoreSlug(undefined)).toBe('');
  });

  test('isReservedStoreSlug identifies reserved system subdomains', () => {
    expect(isReservedStoreSlug('admin')).toBe(true);
    expect(isReservedStoreSlug('api')).toBe(true);
    expect(isReservedStoreSlug('auth')).toBe(true);
    expect(isReservedStoreSlug('www')).toBe(true);
    expect(isReservedStoreSlug('minha-imobiliaria')).toBe(false);
    expect(isReservedStoreSlug('prime-matriz')).toBe(false);
  });
});
