import { describe, expect, it } from 'vitest';
import { clampPage, countPages, getPageItems, listPageNumbers } from './pagination';

const ITEMS = Array.from({ length: 25 }, (_, index) => index + 1);

describe('countPages', () => {
  it('arrondit au supérieur', () => {
    expect(countPages(25, 12)).toBe(3);
  });

  it('renvoie au moins une page même sans résultat', () => {
    expect(countPages(0, 12)).toBe(1);
  });
});

describe('getPageItems', () => {
  it('renvoie la première page', () => {
    expect(getPageItems(ITEMS, 1, 12)).toEqual(ITEMS.slice(0, 12));
  });

  it('renvoie une dernière page incomplète', () => {
    expect(getPageItems(ITEMS, 3, 12)).toEqual([25]);
  });

  it('renvoie une liste vide au-delà de la dernière page', () => {
    expect(getPageItems(ITEMS, 9, 12)).toEqual([]);
  });
});

describe('clampPage', () => {
  it('ramène une page trop grande ou trop petite dans les bornes', () => {
    expect(clampPage(9, 3)).toBe(3);
    expect(clampPage(0, 3)).toBe(1);
    expect(clampPage(2, 3)).toBe(2);
  });
});

describe('listPageNumbers', () => {
  it('liste les numéros de 1 à n', () => {
    expect(listPageNumbers(4)).toEqual([1, 2, 3, 4]);
  });
});
