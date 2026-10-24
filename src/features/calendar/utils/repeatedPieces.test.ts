import { describe, expect, it } from 'vitest';
import type { Outfit } from '../../outfits/types/outfit';
import { findRepeatedPieceIds } from './repeatedPieces';

function outfit(id: string, pieceIds: number[]): Outfit {
  return { id, name: id, pieceIds, note: '', score: 0, occasion: null } as Outfit;
}

const outfits = [outfit('a', [1, 2]), outfit('b', [2, 3])];
const entries = [{ id: 'e', date: '2025-05-10', outfitId: 'a' }];

describe('findRepeatedPieceIds', () => {
  it('repère les pièces déjà portées dans la semaine', () => {
    expect(findRepeatedPieceIds(entries, outfits, '2025-05-13', outfits[1]!)).toEqual([2]);
  });

  it('ignore les tenues trop éloignées', () => {
    expect(findRepeatedPieceIds(entries, outfits, '2025-05-20', outfits[1]!)).toEqual([]);
  });

  it('ignore le jour même', () => {
    expect(findRepeatedPieceIds(entries, outfits, '2025-05-10', outfits[1]!)).toEqual([]);
  });
});
