import { useState, type FormEvent } from 'react';
import { useKeepOutfitIdea } from '../../outfits/hooks/useKeepOutfitIdea';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { askStylist } from '../api/stylistApi';
import { StylistStatus } from '../constants/stylist';
import type { StylistSuggestion } from '../types/stylist';
import { parseStylistAnswer, toStylistSuggestion } from '../utils/stylistAnswer';
import { toStylistPieces } from '../utils/stylistPieces';

export interface StylistState {
  wish: string;
  status: StylistStatus;
  suggestion: StylistSuggestion | null;
  hasPieces: boolean;
  keptOutfitName: string | null;
  changeWish: (wish: string) => void;
  submit: (event: FormEvent<HTMLFormElement>) => void;
  keepSuggestion: () => void;
}

export function useStylist(): StylistState {
  const { items } = useWardrobe();
  const { keptOutfitName, keepIdea } = useKeepOutfitIdea();
  const [wish, setWish] = useState('');
  const [status, setStatus] = useState(StylistStatus.Idle);
  const [suggestion, setSuggestion] = useState<StylistSuggestion | null>(null);
  const pieces = toStylistPieces(items);

  async function runStylist(trimmedWish: string) {
    setStatus(StylistStatus.Thinking);
    setSuggestion(null);
    const answer = parseStylistAnswer(await askStylist(trimmedWish, pieces));
    const result = answer ? toStylistSuggestion(answer, items) : null;
    setSuggestion(result);
    setStatus(result ? StylistStatus.Done : StylistStatus.NoMatch);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedWish = wish.trim();
    if (trimmedWish === '' || status === StylistStatus.Thinking) return;
    void runStylist(trimmedWish).catch(() => setStatus(StylistStatus.Failed));
  }

  return {
    wish,
    status,
    suggestion,
    hasPieces: pieces.length > 0,
    keptOutfitName,
    changeWish: setWish,
    submit,
    keepSuggestion: () => {
      if (suggestion) keepIdea(suggestion.idea);
    },
  };
}
