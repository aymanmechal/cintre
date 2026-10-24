import type { SelectOption } from '../../ui/Form/selectOption';
import { PIECE_COLOR_LABELS, PIECE_COLORS } from './colors';

export const PIECE_COLOR_OPTIONS: readonly SelectOption[] = PIECE_COLORS.map((color) => ({
  value: color,
  label: PIECE_COLOR_LABELS[color],
}));
