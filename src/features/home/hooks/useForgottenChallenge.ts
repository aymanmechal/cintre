import { useState } from 'react';
import { useToday } from '../../../shared/hooks/useToday';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { pickChallengeItem, selectChallengeCandidates } from '../utils/forgottenChallenge';

export interface ForgottenChallengeState {
  item: WardrobeItem | null;
  today: Date;
  canShuffle: boolean;
  shuffle: () => void;
}

export function useForgottenChallenge(): ForgottenChallengeState {
  const { items } = useWardrobe();
  const today = useToday();
  const [shuffleCount, setShuffleCount] = useState(0);
  const candidates = selectChallengeCandidates(items, today);

  return {
    item: pickChallengeItem(candidates, today, shuffleCount),
    today,
    canShuffle: candidates.length > 1,
    shuffle: () => setShuffleCount((count) => count + 1),
  };
}
