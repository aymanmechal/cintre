import type { Outfit } from '../../outfits/types/outfit';
import { toIsoDate } from '../../wardrobe/utils/wornDates';
import { DAYS_PER_WEEK } from '../constants/calendar';
import type { WornEntry } from '../types/wornLog';

export interface RepeatedPiece {
  pieceId: number;
  date: string;
}

function toWeekBounds(isoDate: string): { first: string; last: string } {
  const day = new Date(`${isoDate}T00:00:00`);
  const daysSinceMonday = (day.getDay() + DAYS_PER_WEEK - 1) % DAYS_PER_WEEK;
  const monday = new Date(day.getFullYear(), day.getMonth(), day.getDate() - daysSinceMonday);
  const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
  return { first: toIsoDate(monday), last: toIsoDate(sunday) };
}

function collectWearDates(
  entries: readonly WornEntry[],
  outfits: readonly Outfit[],
  isoDate: string,
): Map<number, string> {
  const { first, last } = toWeekBounds(isoDate);
  const latestDateByPiece = new Map<number, string>();
  entries
    .filter((entry) => entry.date !== isoDate && entry.date >= first && entry.date <= last)
    .forEach((entry) => {
      const outfit = outfits.find((other) => other.id === entry.outfitId);
      outfit?.pieceIds.forEach((pieceId) => {
        const known = latestDateByPiece.get(pieceId);
        if (known === undefined || entry.date > known) latestDateByPiece.set(pieceId, entry.date);
      });
    });
  return latestDateByPiece;
}

export function formatWeekday(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('fr-FR', { weekday: 'long' });
}

export function findRepeatedPieces(
  entries: readonly WornEntry[],
  outfits: readonly Outfit[],
  isoDate: string,
  outfit: Outfit,
): RepeatedPiece[] {
  const wearDates = collectWearDates(entries, outfits, isoDate);
  return outfit.pieceIds.flatMap((pieceId) => {
    const date = wearDates.get(pieceId);
    return date === undefined ? [] : [{ pieceId, date }];
  });
}
