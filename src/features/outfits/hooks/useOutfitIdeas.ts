import { useOutfits } from '../context/useOutfits';
import { buildOutfitIdeas } from '../utils/combinations';
import { useIdeasList, type OutfitIdeasState } from './useIdeasList';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

export type { OutfitIdeasState };

export function useOutfitIdeas(anchors: readonly WardrobeItem[]): OutfitIdeasState {
  const { items } = useWardrobe();
  const { outfits } = useOutfits();
  return useIdeasList((tastes) => buildOutfitIdeas(anchors, items, outfits, tastes));
}
