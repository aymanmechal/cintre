import { describe, expect, it } from 'vitest';
import type { Outfit } from '../../outfits/types/outfit';
import { findRepeatedPieces } from './repeatedPieces';

function outfit(id: string, pieceIds: number[]): Outfit {
  return { id, name: id, pieceIds, note: '', score: 0, occasion: null } as Outfit;
}

const outfits = [outfit('a', [1, 2]), outfit('b', [2, 3]), outfit('c', [2])];
const entries = [{ id: 'e', date: '2025-05-12', outfitId: 'a' }];

describe('findRepeatedPieces', () => {
  it('repère les pièces déjà portées dans la même semaine, avec le jour', () => {
    expect(findRepeatedPieces(entries, outfits, '2025-05-16', outfits[1]!)).toEqual([
      { pieceId: 2, date: '2025-05-12' },
    ]);
  });

  it('compte aussi les jours à venir de la semaine', () => {
    expect(findRepeatedPieces(entries, outfits, '2025-05-12', outfits[1]!)).toEqual([]);
    expect(
      findRepeatedPieces(
        [{ id: 'f', date: '2025-05-18', outfitId: 'a' }],
        outfits,
        '2025-05-13',
        outfits[1]!,
      ),
    ).toEqual([{ pieceId: 2, date: '2025-05-18' }]);
  });

  it('ignore la semaine précédente, même à quelques jours d’écart', () => {
    expect(findRepeatedPieces(entries, outfits, '2025-05-19', outfits[1]!)).toEqual([]);
    expect(
      findRepeatedPieces(
        [{ id: 'g', date: '2025-05-11', outfitId: 'a' }],
        outfits,
        '2025-05-12',
        outfits[1]!,
      ),
    ).toEqual([]);
  });

  it('ignore le jour même', () => {
    expect(findRepeatedPieces(entries, outfits, '2025-05-12', outfits[2]!)).toEqual([]);
  });

  it('garde le jour le plus récent quand une pièce revient plusieurs fois', () => {
    const twice = [
      { id: 'h', date: '2025-05-12', outfitId: 'a' },
      { id: 'i', date: '2025-05-14', outfitId: 'c' },
    ];
    expect(findRepeatedPieces(twice, outfits, '2025-05-16', outfits[1]!)).toEqual([
      { pieceId: 2, date: '2025-05-14' },
    ]);
  });

  it('ignore une entrée dont la tenue n’existe plus', () => {
    const orphan = [{ id: 'j', date: '2025-05-12', outfitId: 'zzz' }];
    expect(findRepeatedPieces(orphan, outfits, '2025-05-16', outfits[1]!)).toEqual([]);
  });
});
