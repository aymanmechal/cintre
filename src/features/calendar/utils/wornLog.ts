import type { Outfit } from '../../outfits/types/outfit';
import type { WornEntry } from '../types/wornLog';

export function createWornEntryId(): string {
  return crypto.randomUUID();
}

export function sortEntriesNewestFirst(entries: readonly WornEntry[]): WornEntry[] {
  return entries.toSorted((first, second) => second.date.localeCompare(first.date));
}

export function selectEntriesOfDate(entries: readonly WornEntry[], isoDate: string): WornEntry[] {
  return entries.filter((entry) => entry.date === isoDate);
}

export function findOutfit(outfits: readonly Outfit[], outfitId: string): Outfit | undefined {
  return outfits.find((outfit) => outfit.id === outfitId);
}
