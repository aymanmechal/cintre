import type { PieceType } from '../constants/categories';
import type { PieceColor } from '../constants/colors';
import type { Season } from '../constants/seasons';

export interface Piece {
  id: number;
  title: string;
  brand: string | null;
  pieceType: PieceType;
  price: number;
  thumbnail: string;
  photoId: string | null;
  extraPhotoIds: string[];
  color: PieceColor | null;
  secondaryColor: PieceColor | null;
  season: Season | null;
  size: string;
  material: string;
  boughtOn: string | null;
  productUrl: string;
  isFavorite: boolean;
  tags: string[];
}
