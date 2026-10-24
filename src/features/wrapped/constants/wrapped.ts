export enum WrappedPeriod {
  Month = 'mois',
  Year = 'annee',
}

export const WRAPPED_PERIOD_LABELS: Record<WrappedPeriod, string> = {
  [WrappedPeriod.Month]: 'Ce mois-ci',
  [WrappedPeriod.Year]: 'Cette année',
};

export const WRAPPED_PERIODS = Object.values(WrappedPeriod);

export const PERIOD_PREFIX_LENGTH: Record<WrappedPeriod, number> = {
  [WrappedPeriod.Month]: 7,
  [WrappedPeriod.Year]: 4,
};

export const NOTHING_WORN_MESSAGE =
  'Rien de noté sur cette période. Ajoute des tenues portées dans ton calendrier !';
