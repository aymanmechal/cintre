import { PIECE_COLORS, type PieceColor } from '../constants/colors';

export function toPieceColor(value: string): PieceColor | null {
  return PIECE_COLORS.find((color) => color === value) ?? null;
}
