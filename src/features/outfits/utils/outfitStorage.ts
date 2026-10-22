import type { Outfit } from '../types/outfit';
import { readJsonFromStorage, writeJsonToStorage } from '../../../shared/utils/storage';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isPieceIdList(value: unknown): boolean {
  return Array.isArray(value) && value.every((pieceId) => typeof pieceId === 'number');
}

function isOutfit(value: unknown): value is Outfit {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    isPieceIdList(value.pieceIds)
  );
}

export function loadStoredOutfits(storageKey: string): Outfit[] {
  const storedValue = readJsonFromStorage(storageKey);
  return Array.isArray(storedValue) ? storedValue.filter(isOutfit) : [];
}

export function saveOutfits(storageKey: string, outfits: readonly Outfit[]): void {
  writeJsonToStorage(storageKey, outfits);
}
