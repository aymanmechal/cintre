import { isRecord } from '../../../shared/utils/isRecord';
import { MAX_OUTFIT_SCORE, NO_SCORE } from '../constants/outfits';
import type { Outfit } from '../types/outfit';
import { toOccasion } from './occasions';
import { readJsonFromStorage, writeJsonToStorage } from '../../../shared/utils/storage';

interface StoredOutfit {
  id: string;
  name: string;
  pieceIds: number[];
  note?: unknown;
  score?: unknown;
  occasion?: unknown;
}

function isPieceIdList(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((pieceId) => typeof pieceId === 'number');
}

function isStoredOutfit(value: unknown): value is StoredOutfit {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    isPieceIdList(value.pieceIds)
  );
}

function toScore(value: unknown): number {
  const isValid = typeof value === 'number' && value >= NO_SCORE && value <= MAX_OUTFIT_SCORE;
  return isValid ? value : NO_SCORE;
}

function toOutfit(stored: StoredOutfit): Outfit {
  return {
    id: stored.id,
    name: stored.name,
    pieceIds: stored.pieceIds,
    note: typeof stored.note === 'string' ? stored.note : '',
    score: toScore(stored.score),
    occasion: toOccasion(stored.occasion),
  };
}

export function parseOutfits(value: unknown): Outfit[] {
  return Array.isArray(value) ? value.filter(isStoredOutfit).map(toOutfit) : [];
}

export function loadStoredOutfits(storageKey: string): Outfit[] {
  return parseOutfits(readJsonFromStorage(storageKey));
}

export function saveOutfits(storageKey: string, outfits: readonly Outfit[]): void {
  writeJsonToStorage(storageKey, outfits);
}
