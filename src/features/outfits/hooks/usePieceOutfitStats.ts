import { useOutfits } from '../context/useOutfits';
import { buildOutfitIdeas, countOutfitsWithPiece } from '../utils/combinations';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

export interface PieceOutfitStats {
  outfitCount: number;
  ideaCount: number;
}

export function usePieceOutfitStats(item: WardrobeItem): PieceOutfitStats {
  const { items } = useWardrobe();
  const { outfits } = useOutfits();

  return {
    outfitCount: countOutfitsWithPiece(outfits, item.piece.id),
    ideaCount: buildOutfitIdeas([item], items, outfits).length,
  };
}
