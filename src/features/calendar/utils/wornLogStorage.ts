import { isRecord } from '../../../shared/utils/isRecord';
import type { WornEntry } from '../types/wornLog';
import { readJsonFromStorage, writeJsonToStorage } from '../../../shared/utils/storage';

function isWornEntry(value: unknown): value is WornEntry {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.date === 'string' &&
    typeof value.outfitId === 'string'
  );
}

export function parseWornLog(value: unknown): WornEntry[] {
  return Array.isArray(value) ? value.filter(isWornEntry) : [];
}

export function loadStoredWornLog(storageKey: string): WornEntry[] {
  return parseWornLog(readJsonFromStorage(storageKey));
}

export function saveWornLog(storageKey: string, entries: readonly WornEntry[]): void {
  writeJsonToStorage(storageKey, entries);
}
