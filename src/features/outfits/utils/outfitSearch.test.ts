import { describe, expect, it } from 'vitest';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { filterOutfitsBySearch } from './outfitSearch';

const ITEMS = [
  makeWardrobeItem({ id: 1, title: 'Jean droit', brand: 'Levi’s' }),
  makeWardrobeItem({ id: 2, title: 'Pull marin', brand: 'Uniqlo' }),
  makeWardrobeItem({ id: 3, title: 'Robe d’été', brand: null }),
];
const CITY = makeOutfit({ id: 'a', name: 'Cool en ville', pieceIds: [1, 2] });
const PARTY = makeOutfit({ id: 'b', name: 'Soirée', pieceIds: [3] });

describe('filterOutfitsBySearch', () => {
  it('garde tout quand la recherche est vide', () => {
    expect(filterOutfitsBySearch([CITY, PARTY], ITEMS, '  ')).toEqual([CITY, PARTY]);
  });

  it('cherche dans le nom, sans accents ni majuscules', () => {
    expect(filterOutfitsBySearch([CITY, PARTY], ITEMS, 'SOIREE')).toEqual([PARTY]);
  });

  it('cherche dans les pièces et les marques de la tenue', () => {
    expect(filterOutfitsBySearch([CITY, PARTY], ITEMS, 'jean')).toEqual([CITY]);
    expect(filterOutfitsBySearch([CITY, PARTY], ITEMS, 'uniqlo')).toEqual([CITY]);
  });

  it('ne renvoie rien quand rien ne correspond', () => {
    expect(filterOutfitsBySearch([CITY, PARTY], ITEMS, 'manteau')).toEqual([]);
  });
});
