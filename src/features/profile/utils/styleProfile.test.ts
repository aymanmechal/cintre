import { describe, expect, it } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { Occasion } from '../../outfits/constants/occasions';
import { RiskLevel } from '../constants/profile';
import { buildStyleProfile, findFavoriteOccasion, toRiskLevel } from './styleProfile';

const NO_TASTES = { liked: [], disliked: [] };
const redTop = makeWardrobeItem({ id: 1, pieceType: PieceType.Tops, color: PieceColor.Red });
const blackBottom = makeWardrobeItem({
  id: 2,
  pieceType: PieceType.Bottoms,
  color: PieceColor.Black,
});
const items = [redTop, blackBottom];

describe('toRiskLevel', () => {
  it('classe selon les couleurs vives par tenue', () => {
    expect(toRiskLevel(0)).toBe(RiskLevel.Sober);
    expect(toRiskLevel(1)).toBe(RiskLevel.Touch);
    expect(toRiskLevel(2)).toBe(RiskLevel.Bold);
  });
});

describe('findFavoriteOccasion', () => {
  it('prend l’occasion la plus fréquente', () => {
    const outfits = [
      makeOutfit({ id: 'a', occasion: Occasion.Work }),
      makeOutfit({ id: 'b', occasion: Occasion.Party }),
      makeOutfit({ id: 'c', occasion: Occasion.Party }),
    ];
    expect(findFavoriteOccasion(outfits)).toBe(Occasion.Party);
    expect(findFavoriteOccasion([makeOutfit({ occasion: null })])).toBeNull();
  });
});

describe('buildStyleProfile', () => {
  it('attend d’avoir des tenues', () => {
    expect(buildStyleProfile(items, [], NO_TASTES)).toBeNull();
  });

  it('dresse le profil à partir des tenues et des goûts', () => {
    const outfits = [makeOutfit({ pieceIds: [1, 2], occasion: Occasion.Work })];
    const profile = buildStyleProfile(items, outfits, { liked: ['1-2'], disliked: [] });
    expect(profile?.risk).toBe(RiskLevel.Touch);
    expect(profile?.topColors.map((entry) => entry.color).sort()).toEqual(['noir', 'rouge']);
    expect(profile?.topColors.reduce((sum, entry) => sum + entry.share, 0)).toBe(100);
    expect(profile?.favoritePieces).toHaveLength(2);
    expect(profile?.favoriteOccasion).toBe(Occasion.Work);
  });
});
