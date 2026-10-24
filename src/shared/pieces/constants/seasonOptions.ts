import type { SelectOption } from '../../ui/Form/selectOption';
import { SEASON_LABELS, SEASONS } from './seasons';

export const NO_SEASON = '';

export const SEASON_OPTIONS: readonly SelectOption[] = [
  { value: NO_SEASON, label: 'Pas précisée' },
  ...SEASONS.map((season) => ({ value: season, label: SEASON_LABELS[season] })),
];
