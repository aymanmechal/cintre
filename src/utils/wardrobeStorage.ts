import { PIECE_TYPES } from '../constants/categories';
import { OWNERSHIP_STATUSES, STORAGE_LOCATIONS } from '../constants/wardrobe';
import type { WardrobeItem } from '../types/wardrobe';
import { readJsonFromStorage, writeJsonToStorage } from './storage';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isStoredPiece(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'number' &&
    typeof value.title === 'string' &&
    typeof value.price === 'number' &&
    PIECE_TYPES.some((pieceType) => pieceType === value.pieceType)
  );
}

function isWardrobeItem(value: unknown): value is WardrobeItem {
  return (
    isRecord(value) &&
    isStoredPiece(value.piece) &&
    OWNERSHIP_STATUSES.some((status) => status === value.status) &&
    STORAGE_LOCATIONS.some((location) => location === value.location)
  );
}

export function loadStoredWardrobe(storageKey: string): WardrobeItem[] {
  const storedValue = readJsonFromStorage(storageKey);
  return Array.isArray(storedValue) ? storedValue.filter(isWardrobeItem) : [];
}

export function saveWardrobe(storageKey: string, items: readonly WardrobeItem[]): void {
  writeJsonToStorage(storageKey, items);
}
