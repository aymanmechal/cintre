import { readJsonFromStorage, writeJsonToStorage } from '../../../shared/utils/storage';
import { VOTED_SHARES_STORAGE_KEY } from '../constants/sharing';

function readVotedShares(): string[] {
  const stored = readJsonFromStorage(VOTED_SHARES_STORAGE_KEY);
  return Array.isArray(stored) ? stored.filter((id) => typeof id === 'string') : [];
}

export function hasVotedFor(shareId: string): boolean {
  return readVotedShares().includes(shareId);
}

export function rememberVote(shareId: string): void {
  writeJsonToStorage(VOTED_SHARES_STORAGE_KEY, [...readVotedShares(), shareId]);
}
