import type { Outfit } from '../../outfits/types/outfit';
import { isFutureDate } from '../../wardrobe/utils/wornDates';
import type { WornEntry } from '../types/wornLog';
import { findOutfit } from './wornLog';

export type WearCounts = ReadonlyMap<number, number>;

export function countWearsByPiece(
  entries: readonly WornEntry[],
  outfits: readonly Outfit[],
  today: Date,
): WearCounts {
  const counts = new Map<number, number>();
  entries
    .filter((entry) => !isFutureDate(entry.date, today))
    .forEach((entry) => {
      findOutfit(outfits, entry.outfitId)?.pieceIds.forEach((pieceId) => {
        counts.set(pieceId, (counts.get(pieceId) ?? 0) + 1);
      });
    });
  return counts;
}

export function getWearCount(counts: WearCounts, pieceId: number): number {
  return counts.get(pieceId) ?? 0;
}
