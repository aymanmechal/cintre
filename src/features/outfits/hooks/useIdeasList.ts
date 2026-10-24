import { useState } from 'react';
import { OUTFIT_IDEAS_PAGE_SIZE } from '../constants/outfits';
import type { OutfitIdea } from '../types/outfit';
import type { Tastes } from '../types/tastes';
import { withoutDisliked } from '../utils/tastes';
import { readStoredTastes } from '../utils/tasteStorage';
import { useKeepOutfitIdea } from './useKeepOutfitIdea';
import { useTastes } from './useTastes';

export interface OutfitIdeasState {
  visibleIdeas: OutfitIdea[];
  hasMoreIdeas: boolean;
  keptOutfitName: string | null;
  likedKeys: string[];
  showMoreIdeas: () => void;
  keepIdea: (idea: OutfitIdea) => void;
  toggleLike: (idea: OutfitIdea) => void;
  dislike: (idea: OutfitIdea) => void;
}

export function useIdeasList(buildIdeas: (tastes: Tastes) => OutfitIdea[]): OutfitIdeasState {
  const { keptOutfitName, keepIdea } = useKeepOutfitIdea();
  const [rankingTastes] = useState(readStoredTastes);
  const { tastes, toggleLike, dislike } = useTastes();
  const [visibleCount, setVisibleCount] = useState(OUTFIT_IDEAS_PAGE_SIZE);
  const ideas = withoutDisliked(buildIdeas(rankingTastes), tastes);

  return {
    visibleIdeas: ideas.slice(0, visibleCount),
    hasMoreIdeas: ideas.length > visibleCount,
    keptOutfitName,
    likedKeys: tastes.liked,
    showMoreIdeas: () => setVisibleCount((count) => count + OUTFIT_IDEAS_PAGE_SIZE),
    keepIdea,
    toggleLike: (idea) => toggleLike(idea.key),
    dislike: (idea) => dislike(idea.key),
  };
}
