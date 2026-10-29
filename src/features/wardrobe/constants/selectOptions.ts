import type { SelectOption } from '../../../shared/ui/Form/selectOption';
import {
  AVAILABILITIES,
  AVAILABILITY_LABELS,
  OWNERSHIP_STATUS_LABELS,
  OWNERSHIP_STATUSES,
} from './wardrobe';

export const OWNERSHIP_STATUS_OPTIONS: readonly SelectOption[] = OWNERSHIP_STATUSES.map(
  (status) => ({ value: status, label: OWNERSHIP_STATUS_LABELS[status] }),
);

export const AVAILABILITY_OPTIONS: readonly SelectOption[] = AVAILABILITIES.map((availability) => ({
  value: availability,
  label: AVAILABILITY_LABELS[availability],
}));
