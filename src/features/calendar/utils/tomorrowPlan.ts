import { Availability } from '../../wardrobe/constants/wardrobe';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import type { Outfit } from '../../outfits/types/outfit';
import { resolveOutfitItems } from '../../outfits/utils/outfits';
import type { WornEntry } from '../types/wornLog';
import type { TomorrowPlan } from '../types/tomorrowPlan';
import { findOutfit, selectEntriesOfDate } from './wornLog';

export function buildTomorrowPlan(
  entries: readonly WornEntry[],
  outfits: readonly Outfit[],
  items: readonly WardrobeItem[],
  tomorrow: string,
): TomorrowPlan | null {
  const [entry] = selectEntriesOfDate(entries, tomorrow);
  const outfit = entry ? findOutfit(outfits, entry.outfitId) : undefined;
  if (!outfit) return null;
  const outfitItems = resolveOutfitItems(outfit, items);
  return {
    outfitName: outfit.name,
    items: outfitItems,
    unavailableItems: outfitItems.filter((item) => item.availability !== Availability.Available),
  };
}
