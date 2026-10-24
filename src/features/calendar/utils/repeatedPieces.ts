import type { Outfit } from '../../outfits/types/outfit';
import type { WornEntry } from '../types/wornLog';

const REPEAT_WINDOW_DAYS = 6;
const MILLISECONDS_PER_DAY = 86_400_000;

function daysBetween(firstIsoDate: string, secondIsoDate: string): number {
  const gap = Date.parse(firstIsoDate) - Date.parse(secondIsoDate);
  return Math.abs(Math.round(gap / MILLISECONDS_PER_DAY));
}

function isNearbyOtherDay(entry: WornEntry, isoDate: string): boolean {
  return entry.date !== isoDate && daysBetween(entry.date, isoDate) <= REPEAT_WINDOW_DAYS;
}

export function findRepeatedPieceIds(
  entries: readonly WornEntry[],
  outfits: readonly Outfit[],
  isoDate: string,
  outfit: Outfit,
): number[] {
  const nearbyOutfitIds = new Set(
    entries.filter((entry) => isNearbyOtherDay(entry, isoDate)).map((entry) => entry.outfitId),
  );
  const nearbyPieceIds = new Set(
    outfits.filter((other) => nearbyOutfitIds.has(other.id)).flatMap((other) => other.pieceIds),
  );
  return outfit.pieceIds.filter((pieceId) => nearbyPieceIds.has(pieceId));
}
