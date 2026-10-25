import { describe, expect, it } from 'vitest';
import { makeOutfit } from '../../../test/factories';
import { OutfitsActionType, outfitsReducer } from './outfitsReducer';

describe('outfitsReducer', () => {
  it('ajoute une nouvelle tenue en premier', () => {
    const existing = makeOutfit({ id: 'a', pieceIds: [1, 2] });
    const created = makeOutfit({ id: 'b', pieceIds: [1, 3] });
    const next = outfitsReducer([existing], {
      type: OutfitsActionType.OutfitCreated,
      outfit: created,
    });
    expect(next.map((outfit) => outfit.id)).toEqual(['b', 'a']);
  });

  it('refuse une tenue qui a exactement les mêmes pièces', () => {
    const existing = makeOutfit({ id: 'a', pieceIds: [1, 2] });
    const next = outfitsReducer([existing], {
      type: OutfitsActionType.OutfitCreated,
      outfit: makeOutfit({ id: 'b', name: 'Autre nom', pieceIds: [2, 1] }),
    });
    expect(next.map((outfit) => outfit.id)).toEqual(['a']);
  });

  it('supprime une tenue', () => {
    const next = outfitsReducer([makeOutfit({ id: 'a', pieceIds: [1] }), makeOutfit({ id: 'b', pieceIds: [2] })], {
      type: OutfitsActionType.OutfitDeleted,
      outfitId: 'a',
    });
    expect(next.map((outfit) => outfit.id)).toEqual(['b']);
  });
});
