import type { WornEntry } from '../types/wornLog';
import { readJsonFromStorage, writeJsonToStorage } from './storage';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isWornEntry(value: unknown): value is WornEntry {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.date === 'string' &&
    typeof value.outfitId === 'string'
  );
}

export function loadStoredWornLog(storageKey: string): WornEntry[] {
  const storedValue = readJsonFromStorage(storageKey);
  return Array.isArray(storedValue) ? storedValue.filter(isWornEntry) : [];
}

export function saveWornLog(storageKey: string, entries: readonly WornEntry[]): void {
  writeJsonToStorage(storageKey, entries);
}
