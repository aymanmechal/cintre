import { Availability } from '../../wardrobe/constants/wardrobe';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import {
  compareByLeastRecentlyWorn,
  countDaysSince,
  isForgotten,
} from '../../wardrobe/utils/wornDates';

const CHALLENGE_START_DATE = '2025-01-01';

export function selectChallengeCandidates(
  items: readonly WardrobeItem[],
  today: Date,
): WardrobeItem[] {
  return items
    .filter((item) => item.availability === Availability.Available && isForgotten(item, today))
    .toSorted(compareByLeastRecentlyWorn);
}

export function pickChallengeItem(
  candidates: readonly WardrobeItem[],
  today: Date,
  shuffleCount: number,
): WardrobeItem | null {
  if (candidates.length === 0) return null;
  const dayNumber = Math.abs(countDaysSince(CHALLENGE_START_DATE, today));
  return candidates[(dayNumber + shuffleCount) % candidates.length];
}
