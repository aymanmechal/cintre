import { CUSTOM_PIECE_RATING, CUSTOM_PIECE_STOCK } from '../constants/pieceForm';
import type { PieceFormValues } from '../types/pieceForm';
import type { Piece } from '../types/piece';
import { toPieceFields } from './pieceFormValues';

function createCustomPieceId(): number {
  return -Date.now();
}

export function isCatalogPiece(pieceId: number): boolean {
  return pieceId > 0;
}

export function buildCustomPiece(values: PieceFormValues): Piece {
  return {
    id: createCustomPieceId(),
    rating: CUSTOM_PIECE_RATING,
    stock: CUSTOM_PIECE_STOCK,
    ...toPieceFields(values),
  };
}
