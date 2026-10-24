import {
  BOLD_MIN_ACCENTS,
  MIN_PROFILE_SIGNALS,
  PROFILE_TOP_SIZE,
  RiskLevel,
  SOBER_MAX_ACCENTS,
} from '../constants/profile';
import type { Occasion } from '../../outfits/constants/occasions';
import type { Tastes } from '../../outfits/types/tastes';
import type { Outfit } from '../../outfits/types/outfit';
import { selectAccentColors } from '../../outfits/utils/colorHarmony';
import { resolveOutfitItems } from '../../outfits/utils/outfits';
import { buildPieceAffinity } from '../../outfits/utils/tastes';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import type { PieceColor } from '../../../shared/pieces/constants/colors';
import type { ColorShare, StyleProfile } from '../types/profile';

interface WeightedItem {
  item: WardrobeItem;
  weight: number;
}

function toWeightedItems(
  items: readonly WardrobeItem[],
  affinity: ReadonlyMap<number, number>,
): WeightedItem[] {
  return items
    .filter((item) => item.status === OwnershipStatus.Owned)
    .map((item) => ({ item, weight: affinity.get(item.piece.id) ?? 0 }))
    .filter((weighted) => weighted.weight > 0);
}

export function buildTopColors(weighted: readonly WeightedItem[]): ColorShare[] {
  const weights = new Map<PieceColor, number>();
  for (const { item, weight } of weighted) {
    if (item.piece.color !== null) {
      weights.set(item.piece.color, (weights.get(item.piece.color) ?? 0) + weight);
    }
  }
  const total = [...weights.values()].reduce((sum, weight) => sum + weight, 0);
  return [...weights.entries()]
    .toSorted((first, second) => second[1] - first[1])
    .slice(0, PROFILE_TOP_SIZE)
    .map(([color, weight]) => ({ color, share: Math.round((weight / total) * 100) }));
}

export function toRiskLevel(averageAccents: number): RiskLevel {
  if (averageAccents <= SOBER_MAX_ACCENTS) return RiskLevel.Sober;
  if (averageAccents >= BOLD_MIN_ACCENTS) return RiskLevel.Bold;
  return RiskLevel.Touch;
}

function measureRisk(outfits: readonly Outfit[], items: readonly WardrobeItem[]): RiskLevel {
  const accentCounts = outfits.map(
    (outfit) => selectAccentColors(resolveOutfitItems(outfit, items)).length,
  );
  const total = accentCounts.reduce((sum, count) => sum + count, 0);
  return toRiskLevel(total / accentCounts.length);
}

export function findFavoriteOccasion(outfits: readonly Outfit[]): Occasion | null {
  const counts = new Map<Occasion, number>();
  for (const outfit of outfits) {
    if (outfit.occasion) counts.set(outfit.occasion, (counts.get(outfit.occasion) ?? 0) + 1);
  }
  const best = [...counts.entries()].toSorted((first, second) => second[1] - first[1])[0];
  return best?.[0] ?? null;
}

export function buildStyleProfile(
  items: readonly WardrobeItem[],
  outfits: readonly Outfit[],
  tastes: Tastes,
): StyleProfile | null {
  const affinity = buildPieceAffinity(tastes, outfits);
  const weighted = toWeightedItems(items, affinity);
  if (outfits.length === 0 || weighted.length < MIN_PROFILE_SIGNALS) return null;
  return {
    topColors: buildTopColors(weighted),
    risk: measureRisk(outfits, items),
    favoritePieces: weighted
      .toSorted((first, second) => second.weight - first.weight)
      .slice(0, PROFILE_TOP_SIZE)
      .map((entry) => entry.item),
    favoriteOccasion: findFavoriteOccasion(outfits),
  };
}
