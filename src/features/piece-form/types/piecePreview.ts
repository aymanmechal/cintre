import type { PieceType } from '../../../shared/pieces/constants/categories';

export interface PiecePreviewData {
  title: string;
  hasTitle: boolean;
  brand: string;
  price: string;
  imageUrl: string;
  pieceType: PieceType;
}
