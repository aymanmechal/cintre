import type { PieceType } from '../../../shared/pieces/constants/categories';
import type { PieceColor } from '../../../shared/pieces/constants/colors';
import type { Season } from '../../../shared/pieces/constants/seasons';

export interface PhotoRecognition {
  title: string;
  pieceType: PieceType | null;
  color: PieceColor | null;
  season: Season | null;
}
