import { useState } from 'react';
import { NO_SCORE } from '../constants/outfits';
import { useOutfits } from '../context/useOutfits';
import type { OutfitIdea } from '../types/outfit';
import { toIdeaPieceIds } from '../utils/combinations';
import { buildDefaultOutfitName, createOutfitId, hasSamePieces } from '../utils/outfits';

export interface KeepOutfitIdeaState {
  keptOutfitName: string | null;
  keepIdea: (idea: OutfitIdea) => void;
}

export function useKeepOutfitIdea(): KeepOutfitIdeaState {
  const { outfits, createOutfit } = useOutfits();
  const [keptOutfitName, setKeptOutfitName] = useState<string | null>(null);

  function keepIdea(idea: OutfitIdea) {
    const pieceIds = toIdeaPieceIds(idea);
    if (hasSamePieces(outfits, pieceIds)) return;
    const name = buildDefaultOutfitName(outfits.length);
    createOutfit({
      id: createOutfitId(),
      name,
      pieceIds,
      note: '',
      score: NO_SCORE,
      occasion: null,
    });
    setKeptOutfitName(name);
  }

  return { keptOutfitName, keepIdea };
}
