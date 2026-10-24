import { TASTES_STORAGE_KEY } from '../constants/tastes';
import type { Tastes } from '../types/tastes';
import { parseTastes } from './tastes';
import { readJsonFromStorage, writeJsonToStorage } from '../../../shared/utils/storage';

export function readStoredTastes(): Tastes {
  return parseTastes(readJsonFromStorage(TASTES_STORAGE_KEY));
}

export function saveTastes(tastes: Tastes): void {
  writeJsonToStorage(TASTES_STORAGE_KEY, tastes);
}
