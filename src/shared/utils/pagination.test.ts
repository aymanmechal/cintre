import { describe, expect, it } from 'vitest';
import { clampPage, countPages, selectPage } from './pagination';

describe('pagination', () => {
  it('compte au moins une page', () => {
    expect(countPages(0, 4)).toBe(1);
    expect(countPages(4, 4)).toBe(1);
    expect(countPages(5, 4)).toBe(2);
  });

  it('garde la page dans les limites', () => {
    expect(clampPage(0, 3)).toBe(1);
    expect(clampPage(9, 3)).toBe(3);
    expect(clampPage(2, 3)).toBe(2);
  });

  it('découpe une page', () => {
    expect(selectPage([1, 2, 3, 4, 5], 2, 2)).toEqual([3, 4]);
    expect(selectPage([1, 2, 3, 4, 5], 3, 2)).toEqual([5]);
  });
});
