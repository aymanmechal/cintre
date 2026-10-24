import { MAX_COMPARED_OUTFITS, MAX_OUTFIT_SCORE, NO_SCORE } from '../constants/outfits';
import type { OutfitReadiness } from '../constants/outfits';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import type { Outfit } from '../types/outfit';
import { getOutfitReadiness, resolveOutfitItems, sumPrices } from './outfits';

export interface ComparedOutfit {
  outfit: Outfit;
  items: WardrobeItem[];
  totalPrice: number;
  readiness: OutfitReadiness;
}

export function buildComparedOutfit(
  outfit: Outfit,
  items: readonly WardrobeItem[],
): ComparedOutfit {
  const outfitItems = resolveOutfitItems(outfit, items);
  return {
    outfit,
    items: outfitItems,
    totalPrice: sumPrices(outfitItems),
    readiness: getOutfitReadiness(outfitItems),
  };
}

export function toggleComparedId(comparedIds: readonly string[], outfitId: string): string[] {
  if (comparedIds.includes(outfitId)) return comparedIds.filter((id) => id !== outfitId);
  return comparedIds.length < MAX_COMPARED_OUTFITS ? [...comparedIds, outfitId] : [...comparedIds];
}

export function selectComparedOutfits(
  outfits: readonly Outfit[],
  comparedIds: readonly string[],
): Outfit[] {
  return outfits.filter((outfit) => comparedIds.includes(outfit.id));
}

export function formatOutfitScore(score: number): string {
  return score > NO_SCORE ? `${score}/${MAX_OUTFIT_SCORE}` : 'Pas encore notée';
}
