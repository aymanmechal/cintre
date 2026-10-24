import { collectPiecePhotoIds } from '../../../shared/pieces/utils/piecePhotos';
import { TRASH_RETENTION_DAYS } from '../constants/wardrobe';
import type { TrashedItem } from '../types/wardrobe';
import { countDaysSince } from './wornDates';

export function countDaysBeforePurge(trashedItem: TrashedItem, today: Date): number {
  return Math.max(0, TRASH_RETENTION_DAYS - countDaysSince(trashedItem.deletedOn, today));
}

export function isExpired(trashedItem: TrashedItem, today: Date): boolean {
  return countDaysSince(trashedItem.deletedOn, today) >= TRASH_RETENTION_DAYS;
}

export function removeExpiredItems(trash: readonly TrashedItem[], today: Date): TrashedItem[] {
  return trash.filter((trashedItem) => !isExpired(trashedItem, today));
}

export function formatDaysBeforePurge(days: number): string {
  if (days <= 1) return 'Disparaît demain';
  return `Disparaît dans ${days} jours`;
}

export function collectPhotoIds(trash: readonly TrashedItem[]): string[] {
  return trash.flatMap(({ item }) => collectPiecePhotoIds(item.piece));
}
