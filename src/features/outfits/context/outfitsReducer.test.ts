import { describe, expect, it } from 'vitest';
import { makeOutfit } from '../../../test/factories';
import { OutfitsActionType, outfitsReducer } from './outfitsReducer';

describe('outfitsReducer', () => {
  it('ajoute une nouvelle tenue en premier', () => {
    const existing = makeOutfit({ id: 'a' });
    const created = makeOutfit({ id: 'b' });
    const next = outfitsReducer([existing], {
      type: OutfitsActionType.OutfitCreated,
      outfit: created,
    });
    expect(next.map((outfit) => outfit.id)).toEqual(['b', 'a']);
  });

  it('supprime une tenue', () => {
    const next = outfitsReducer([makeOutfit({ id: 'a' }), makeOutfit({ id: 'b' })], {
      type: OutfitsActionType.OutfitDeleted,
      outfitId: 'a',
    });
    expect(next.map((outfit) => outfit.id)).toEqual(['b']);
  });
});
