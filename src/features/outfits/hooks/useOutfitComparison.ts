import { useState } from 'react';
import { MAX_COMPARED_OUTFITS } from '../constants/outfits';
import type { Outfit } from '../types/outfit';
import { selectComparedOutfits, toggleComparedId } from '../utils/outfitComparison';

export interface OutfitComparisonState {
  comparedOutfits: Outfit[];
  canCompareMore: boolean;
  isCompared: (outfitId: string) => boolean;
  toggleCompared: (outfitId: string) => void;
  clearComparison: () => void;
}

export function useOutfitComparison(outfits: readonly Outfit[]): OutfitComparisonState {
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const comparedOutfits = selectComparedOutfits(outfits, comparedIds);

  return {
    comparedOutfits,
    canCompareMore: comparedOutfits.length < MAX_COMPARED_OUTFITS,
    isCompared: (outfitId) => comparedIds.includes(outfitId),
    toggleCompared: (outfitId) => setComparedIds(toggleComparedId(comparedIds, outfitId)),
    clearComparison: () => setComparedIds([]),
  };
}
