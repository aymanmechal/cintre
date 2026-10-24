import { isRecord } from '../../../shared/utils/isRecord';
import { PIECE_TYPES } from '../../../shared/pieces/constants/categories';
import { toPiece } from '../../../shared/pieces/utils/pieceMigration';
import {
  ARCHIVE_REASONS,
  AVAILABILITIES,
  Availability,
  OWNERSHIP_STATUSES,
  STORAGE_LOCATIONS,
} from '../constants/wardrobe';
import type { ArchivedItem, TrashedItem, WardrobeItem } from '../types/wardrobe';
import { readJsonFromStorage, writeJsonToStorage } from '../../../shared/utils/storage';

type StoredWardrobeItem = Omit<WardrobeItem, 'piece' | 'availability'> & {
  piece: Record<string, unknown>;
  availability?: unknown;
};

function isStoredPiece(value: unknown): value is Record<string, unknown> {
  return (
    isRecord(value) &&
    typeof value.id === 'number' &&
    typeof value.title === 'string' &&
    typeof value.price === 'number' &&
    PIECE_TYPES.some((pieceType) => pieceType === value.pieceType)
  );
}

function isStoredWardrobeItem(value: unknown): value is StoredWardrobeItem {
  return (
    isRecord(value) &&
    isStoredPiece(value.piece) &&
    OWNERSHIP_STATUSES.some((status) => status === value.status) &&
    STORAGE_LOCATIONS.some((location) => location === value.location)
  );
}

function toWardrobeItem(stored: StoredWardrobeItem): WardrobeItem {
  return {
    piece: toPiece(stored.piece),
    status: stored.status,
    location: stored.location,
    availability:
      AVAILABILITIES.find((value) => value === stored.availability) ?? Availability.Available,
    lastWornOn: typeof stored.lastWornOn === 'string' ? stored.lastWornOn : null,
  };
}

export function parseWardrobe(value: unknown): WardrobeItem[] {
  return Array.isArray(value) ? value.filter(isStoredWardrobeItem).map(toWardrobeItem) : [];
}

export function loadStoredWardrobe(storageKey: string): WardrobeItem[] {
  return parseWardrobe(readJsonFromStorage(storageKey));
}

function isStoredTrashedItem(
  value: unknown,
): value is { item: StoredWardrobeItem; deletedOn: string } {
  return isRecord(value) && typeof value.deletedOn === 'string' && isStoredWardrobeItem(value.item);
}

export function parseTrash(value: unknown): TrashedItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(isStoredTrashedItem)
    .map((stored) => ({ item: toWardrobeItem(stored.item), deletedOn: stored.deletedOn }));
}

export function loadStoredTrash(storageKey: string): TrashedItem[] {
  return parseTrash(readJsonFromStorage(storageKey));
}

export function saveWardrobe(storageKey: string, items: readonly WardrobeItem[]): void {
  writeJsonToStorage(storageKey, items);
}

function isStoredArchivedItem(
  value: unknown,
): value is { item: StoredWardrobeItem; reason: ArchivedItem['reason']; archivedOn: string } {
  return (
    isRecord(value) &&
    typeof value.archivedOn === 'string' &&
    ARCHIVE_REASONS.some((reason) => reason === value.reason) &&
    isStoredWardrobeItem(value.item)
  );
}

export function parseArchive(value: unknown): ArchivedItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isStoredArchivedItem).map((stored) => ({
    item: toWardrobeItem(stored.item),
    reason: stored.reason,
    archivedOn: stored.archivedOn,
  }));
}

export function loadStoredArchive(storageKey: string): ArchivedItem[] {
  return parseArchive(readJsonFromStorage(storageKey));
}

export function saveArchive(storageKey: string, archive: readonly ArchivedItem[]): void {
  writeJsonToStorage(storageKey, archive);
}

export function saveTrash(storageKey: string, trash: readonly TrashedItem[]): void {
  writeJsonToStorage(storageKey, trash);
}
