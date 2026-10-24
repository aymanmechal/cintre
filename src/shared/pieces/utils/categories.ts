import {
  ALL_PIECE_TYPES,
  DEFAULT_PIECE_TYPE,
  PIECE_TYPES,
  type PieceType,
  type PieceTypeFilter,
} from '../constants/categories';

export function toPieceTypeFilter(value: string): PieceTypeFilter {
  return PIECE_TYPES.find((pieceType) => pieceType === value) ?? ALL_PIECE_TYPES;
}

export function toPieceType(value: string): PieceType {
  return PIECE_TYPES.find((pieceType) => pieceType === value) ?? DEFAULT_PIECE_TYPE;
}
