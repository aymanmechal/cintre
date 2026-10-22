import { describe, expect, it } from 'vitest';
import { normalizeForSearch } from './text';

describe('normalizeForSearch', () => {
  it('retire les accents', () => {
    expect(normalizeForSearch('Éléphant')).toBe('elephant');
  });

  it('met en minuscules et retire les espaces autour', () => {
    expect(normalizeForSearch('  CHEMISE  ')).toBe('chemise');
  });

  it('laisse une chaîne vide vide', () => {
    expect(normalizeForSearch('')).toBe('');
  });
});
