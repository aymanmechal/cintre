import type { PieceType } from '../constants/categories';

export interface PiecePreviewData {
  title: string;
  hasTitle: boolean;
  brand: string;
  price: string;
  imageUrl: string;
  pieceType: PieceType;
}
