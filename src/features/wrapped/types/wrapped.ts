import type { Outfit } from '../../outfits/types/outfit';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import type { PieceColor } from '../../../shared/pieces/constants/colors';

export interface WornPiece {
  item: WardrobeItem;
  wearCount: number;
}

export interface WornOutfit {
  outfit: Outfit;
  wearCount: number;
}

export interface Wrapped {
  wornDayCount: number;
  topPiece: WornPiece | null;
  topClothing: WornPiece | null;
  topOutfit: WornOutfit | null;
  topColor: PieceColor | null;
  forgottenCount: number;
  purchaseCount: number;
  spent: number;
}
