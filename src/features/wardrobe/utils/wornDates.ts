import { formatPieceCount } from '../../../shared/utils/format';
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
  if (lastWornOn === null) return 'Jamais portée';
  const days = countDaysSince(lastWornOn, now);
  if (days <= 0) return "Portée aujourd'hui";
  if (days === 1) return 'Portée hier';
  return `Portée il y a ${days} jours`;
}

export function isForgotten(item: WardrobeItem, now: Date): boolean {
  if (item.status !== OwnershipStatus.Owned) return false;
  return item.lastWornOn === null || countDaysSince(item.lastWornOn, now) > FORGOTTEN_AFTER_DAYS;
}

export function isFutureDate(isoDate: string, today: Date): boolean {
  return isoDate > toIsoDate(today);
}

export function isNewerWornDate(date: string, currentLastWornOn: string | null): boolean {
  return currentLastWornOn === null || date > currentLastWornOn;
}

export function formatCalendarDate(isoDate: string, today: Date): string {
  const days = countDaysSince(isoDate, today);
  if (days === 0) return "Aujourd'hui";
  if (days === 1) return 'Hier';
  if (days === -1) return 'Demain';
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function formatForgottenMessage(forgottenCount: number): string {
  const verb = forgottenCount > 1 ? 'dorment' : 'dort';
  return `${formatPieceCount(forgottenCount)} ${verb} dans ta garde-robe. Et si tu les ressortais ?`;
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
