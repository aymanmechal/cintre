import type { SelectOption } from '../../../shared/ui/Form/selectOption';

export enum Occasion {
  Everyday = 'quotidien',
  Work = 'travail',
  Class = 'cours',
  Date = 'rendez-vous',
  Party = 'soiree',
  Wedding = 'mariage',
  Interview = 'entretien',
  Sport = 'sport',
  Holiday = 'vacances',
}

export const OCCASION_LABELS: Record<Occasion, string> = {
  [Occasion.Everyday]: 'Quotidien',
  [Occasion.Work]: 'Travail',
  [Occasion.Class]: 'Cours',
  [Occasion.Date]: 'Rendez-vous',
  [Occasion.Party]: 'Soirée',
  [Occasion.Wedding]: 'Mariage',
  [Occasion.Interview]: 'Entretien',
  [Occasion.Sport]: 'Sport',
  [Occasion.Holiday]: 'Vacances',
};

export const OCCASIONS = Object.values(Occasion);

export const NO_OCCASION = '';

export const ALL_OCCASIONS = 'toutes';

export const OCCASION_OPTIONS: readonly SelectOption[] = [
  { value: NO_OCCASION, label: 'Aucune' },
  ...OCCASIONS.map((occasion) => ({ value: occasion, label: OCCASION_LABELS[occasion] })),
];

export const OCCASION_FILTER_OPTIONS: readonly SelectOption[] = [
  { value: ALL_OCCASIONS, label: 'Toutes les occasions' },
  ...OCCASIONS.map((occasion) => ({ value: occasion, label: OCCASION_LABELS[occasion] })),
];
