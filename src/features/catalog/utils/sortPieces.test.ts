import { describe, expect, it } from 'vitest';
import { makePiece } from '../../../test/factories';
import { PieceSortOrder } from '../constants/sorting';
import { sortPieces, toPieceSortOrder } from './sortPieces';

const CHEAP = makePiece({ id: 1, price: 10 });
const MIDDLE = makePiece({ id: 2, price: 50 });
const EXPENSIVE = makePiece({ id: 3, price: 200 });
const PIECES = [MIDDLE, EXPENSIVE, CHEAP];

describe('sortPieces', () => {
  it("garde l'ordre d’origine par défaut", () => {
    expect(sortPieces(PIECES, PieceSortOrder.Default)).toEqual(PIECES);
  });

  it('trie par prix croissant', () => {
    expect(sortPieces(PIECES, PieceSortOrder.PriceAscending)).toEqual([CHEAP, MIDDLE, EXPENSIVE]);
  });

  it('trie par prix décroissant', () => {
    expect(sortPieces(PIECES, PieceSortOrder.PriceDescending)).toEqual([EXPENSIVE, MIDDLE, CHEAP]);
  });

  it("ne modifie pas la liste d'origine", () => {
    sortPieces(PIECES, PieceSortOrder.PriceAscending);
    expect(PIECES).toEqual([MIDDLE, EXPENSIVE, CHEAP]);
  });
});

describe('toPieceSortOrder', () => {
  it('reconnaît une valeur valide', () => {
    expect(toPieceSortOrder('prix-croissant')).toBe(PieceSortOrder.PriceAscending);
  });

  it('retombe sur le tri par défaut', () => {
    expect(toPieceSortOrder("n'importe quoi")).toBe(PieceSortOrder.Default);
  });
});
