import type { SelectOption } from '../components/ui/Form/selectOption';
import { PIECE_TYPE_LABELS, PIECE_TYPES } from './categories';
import {
  OWNERSHIP_STATUS_LABELS,
  OWNERSHIP_STATUSES,
  STORAGE_LOCATION_LABELS,
  STORAGE_LOCATIONS,
} from './wardrobe';

export const PIECE_TYPE_OPTIONS: readonly SelectOption[] = PIECE_TYPES.map((pieceType) => ({
  value: pieceType,
  label: PIECE_TYPE_LABELS[pieceType],
}));

export const OWNERSHIP_STATUS_OPTIONS: readonly SelectOption[] = OWNERSHIP_STATUSES.map(
  (status) => ({ value: status, label: OWNERSHIP_STATUS_LABELS[status] }),
);

export const STORAGE_LOCATION_OPTIONS: readonly SelectOption[] = STORAGE_LOCATIONS.map(
  (location) => ({ value: location, label: STORAGE_LOCATION_LABELS[location] }),
);
