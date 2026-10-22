import { FORGOTTEN_AFTER_DAYS, MILLISECONDS_PER_DAY, OwnershipStatus } from '../constants/wardrobe';
import type { WardrobeItem } from '../types/wardrobe';

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toIsoDate(date: Date): string {
  return date.toLocaleDateString('sv-SE');
}

export function countDaysSince(isoDate: string, now: Date): number {
  const wornDay = startOfDay(new Date(`${isoDate}T00:00:00`));
  return Math.round((startOfDay(now).getTime() - wornDay.getTime()) / MILLISECONDS_PER_DAY);
}

export function formatLastWorn(lastWornOn: string | null, now: Date): string {
  if (lastWornOn === null) return 'Jamais port\u00e9e';
  const days = countDaysSince(lastWornOn, now);
  if (days <= 0) return "Port\u00e9e aujourd'hui";
  if (days === 1) return 'Port\u00e9e hier';
  return `Port\u00e9e il y a ${days} jours`;
}

export function isForgotten(item: WardrobeItem, now: Date): boolean {
  if (item.status !== OwnershipStatus.Owned) return false;
  return item.lastWornOn === null || countDaysSince(item.lastWornOn, now) > FORGOTTEN_AFTER_DAYS;
}

export function countForgottenItems(items: readonly WardrobeItem[], now: Date): number {
  return items.filter((item) => isForgotten(item, now)).length;
}

export function selectMostForgottenItems(
  items: readonly WardrobeItem[],
  today: Date,
  limit: number,
): WardrobeItem[] {
  return items
    .filter((item) => isForgotten(item, today))
    .toSorted(compareByLeastRecentlyWorn)
    .slice(0, limit);
}

export function compareByLeastRecentlyWorn(first: WardrobeItem, second: WardrobeItem): number {
  return (first.lastWornOn ?? '').localeCompare(second.lastWornOn ?? '');
}
