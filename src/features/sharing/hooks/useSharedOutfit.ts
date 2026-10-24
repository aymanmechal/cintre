import { useEffect, useState } from 'react';
import { fetchSharedOutfit, sendVote } from '../api/sharingApi';
import { SharedPageStatus } from '../constants/sharing';
import type { SharedOutfit } from '../types/sharing';
import { parseSharedOutfit } from '../utils/sharing';
import { hasVotedFor, rememberVote } from '../utils/votedShares';

export interface SharedOutfitState {
  status: SharedPageStatus;
  shared: SharedOutfit | null;
  hasVoted: boolean;
  vote: (choice: string) => void;
}

export function useSharedOutfit(shareId: string): SharedOutfitState {
  const [shared, setShared] = useState<SharedOutfit | null>(null);
  const [status, setStatus] = useState(SharedPageStatus.Loading);
  const [hasVoted, setHasVoted] = useState(() => hasVotedFor(shareId));

  useEffect(() => {
    fetchSharedOutfit(shareId)
      .then((value) => {
        const parsed = parseSharedOutfit(value);
        setShared(parsed);
        setStatus(parsed ? SharedPageStatus.Ready : SharedPageStatus.Missing);
      })
      .catch(() => setStatus(SharedPageStatus.Missing));
  }, [shareId]);

  async function vote(choice: string) {
    if (shared === null || hasVoted) return;
    setHasVoted(true);
    rememberVote(shareId);
    setShared({ ...shared, votes: [...shared.votes, choice] });
    await sendVote(shareId, choice).catch(() => undefined);
  }

  return { status, shared, hasVoted, vote: (choice) => void vote(choice) };
}
