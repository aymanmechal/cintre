import { PIECE_COLORS, type PieceColor } from '../constants/colors';

export interface PieceColors {
  color: PieceColor | null;
  secondaryColor: PieceColor | null;
}

export function toPieceColor(value: string): PieceColor | null {
  return PIECE_COLORS.find((color) => color === value) ?? null;
}

export function normalizePieceColors(
  color: PieceColor | null,
  secondaryColor: PieceColor | null,
): PieceColors {
  if (color === null) return { color: secondaryColor, secondaryColor: null };
  return { color, secondaryColor: secondaryColor === color ? null : secondaryColor };
}
