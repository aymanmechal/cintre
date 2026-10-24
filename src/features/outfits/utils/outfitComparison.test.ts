import { describe, expect, it } from 'vitest';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { OutfitReadiness } from '../constants/outfits';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import {
  buildComparedOutfit,
  formatOutfitScore,
  selectComparedOutfits,
  toggleComparedId,
} from './outfitComparison';

describe('outfitComparison', () => {
  it('ajoute puis retire une tenue de la comparaison', () => {
    expect(toggleComparedId([], 'a')).toEqual(['a']);
    expect(toggleComparedId(['a', 'b'], 'a')).toEqual(['b']);
  });

  it('refuse une quatrième tenue', () => {
    expect(toggleComparedId(['a', 'b', 'c'], 'd')).toEqual(['a', 'b', 'c']);
  });

  it('retrouve les tenues comparées, même après une suppression', () => {
    const outfits = [makeOutfit({ id: 'a' }), makeOutfit({ id: 'b' })];
    expect(selectComparedOutfits(outfits, ['b', 'supprimee'])).toEqual([outfits[1]]);
  });

  it('calcule le prix, les pièces et l’état d’une tenue', () => {
    const owned = makeWardrobeItem({ id: 1, price: 40 });
    const wanted = makeWardrobeItem({ id: 2, price: 60 }, { status: OwnershipStatus.Wanted });
    const compared = buildComparedOutfit(makeOutfit({ pieceIds: [1, 2] }), [owned, wanted]);
    expect(compared).toMatchObject({ totalPrice: 100, readiness: OutfitReadiness.Goal });
    expect(compared.items).toHaveLength(2);
  });

  it('écrit la note', () => {
    expect(formatOutfitScore(0)).toBe('Pas encore notée');
    expect(formatOutfitScore(4)).toBe('4/5');
  });
});
