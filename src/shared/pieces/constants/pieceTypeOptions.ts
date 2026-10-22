import type { SelectOption } from '../../ui/Form/selectOption';
import { PIECE_TYPE_LABELS, PIECE_TYPES } from './categories';

export const PIECE_TYPE_OPTIONS: readonly SelectOption[] = PIECE_TYPES.map((pieceType) => ({
  value: pieceType,
  label: PIECE_TYPE_LABELS[pieceType],
}));
