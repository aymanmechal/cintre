import type { Piece } from '../../../shared/pieces/types/piece';
import type { PieceFormValues } from '../types/pieceForm';
import { toPieceFields } from './pieceFormValues';

function createCustomPieceId(): number {
  return -Date.now();
}

export function buildCustomPiece(values: PieceFormValues): Piece {
  return {
    id: createCustomPieceId(),
    isFavorite: false,
    ...toPieceFields(values),
  };
}
