import { useOutfits } from '../context/useOutfits';
import { buildColorIdeas } from '../utils/colorIdeas';
import { useIdeasList, type OutfitIdeasState } from './useIdeasList';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import type { PieceColor } from '../../../shared/pieces/constants/colors';

export function useColorIdeas(color: PieceColor): OutfitIdeasState {
  const { items } = useWardrobe();
  const { outfits } = useOutfits();
  return useIdeasList((tastes) => buildColorIdeas(color, items, outfits, tastes));
}
