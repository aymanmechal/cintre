import { describe, expect, it } from 'vitest';
import { makeOutfit } from '../../../test/factories';
import { countWearsByPiece, getWearCount } from './wearCounts';

const TODAY = new Date(2026, 2, 15, 12, 0);
const OUTFITS = [makeOutfit({ id: 'a', pieceIds: [1, 2] }), makeOutfit({ id: 'b', pieceIds: [2] })];

describe('countWearsByPiece', () => {
  it('compte une fois par jour porté et par pièce de la tenue', () => {
    const entries = [
      { id: '1', date: '2026-03-10', outfitId: 'a' },
      { id: '2', date: '2026-03-12', outfitId: 'b' },
    ];
    const counts = countWearsByPiece(entries, OUTFITS, TODAY);
    expect(getWearCount(counts, 1)).toBe(1);
    expect(getWearCount(counts, 2)).toBe(2);
  });

  it('ignore le futur et les tenues supprimées', () => {
    const entries = [
      { id: '1', date: '2026-03-20', outfitId: 'a' },
      { id: '2', date: '2026-03-10', outfitId: 'inconnue' },
    ];
    expect(countWearsByPiece(entries, OUTFITS, TODAY).size).toBe(0);
  });

  it('renvoie 0 pour une pièce jamais portée', () => {
    expect(getWearCount(countWearsByPiece([], OUTFITS, TODAY), 1)).toBe(0);
  });
});
