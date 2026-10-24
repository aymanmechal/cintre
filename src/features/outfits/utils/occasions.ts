import { OCCASIONS, type Occasion } from '../constants/occasions';
import { ALL_OCCASIONS } from '../constants/occasions';
import type { Outfit } from '../types/outfit';

export type OccasionFilter = Occasion | typeof ALL_OCCASIONS;

export function toOccasion(value: unknown): Occasion | null {
  return OCCASIONS.find((occasion) => occasion === value) ?? null;
}

export function toOccasionFilter(value: string): OccasionFilter {
  return toOccasion(value) ?? ALL_OCCASIONS;
}

export function filterOutfitsByOccasion(
  outfits: readonly Outfit[],
  occasion: OccasionFilter,
): Outfit[] {
  return occasion === ALL_OCCASIONS
    ? [...outfits]
    : outfits.filter((outfit) => outfit.occasion === occasion);
}
