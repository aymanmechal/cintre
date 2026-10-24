import type { Occasion } from '../../outfits/constants/occasions';
import type { RiskLevel } from '../constants/profile';
import type { PieceColor } from '../../../shared/pieces/constants/colors';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

export interface ColorShare {
  color: PieceColor;
  share: number;
}

export interface StyleProfile {
  topColors: ColorShare[];
  risk: RiskLevel;
  favoritePieces: WardrobeItem[];
  favoriteOccasion: Occasion | null;
}
