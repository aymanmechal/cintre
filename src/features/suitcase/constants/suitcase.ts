export const SUITCASE_STORAGE_KEY = 'cintre.suitcase';

export const MIN_TRIP_DAYS = 1;

export const MAX_TRIP_DAYS = 14;

export const DEFAULT_TRIP_DAYS = '3';

export const DAYS_PER_TOP = 2;

export const DAYS_PER_BOTTOM = 3;

export const SHOES_PER_TRIP = 1;

export const PACKING_RULE = `Le minimum : un haut pour ${DAYS_PER_TOP} jours, un bas pour ${DAYS_PER_BOTTOM} jours, une paire de chaussures.`;

export const NO_FORECAST_YET_MESSAGE =
  'Départ trop lointain pour la météo : je prends des pièces de toutes saisons.';

export const FORECAST_FAILED_MESSAGE =
  'La météo ne répond pas : je prends des pièces de toutes saisons.';

export const NOT_ENOUGH_PIECES_MESSAGE =
  'Pas assez de pièces disponibles pour ce temps-là : il faut au moins un haut et un bas, ou une robe.';

export enum TripError {
  MissingCity = 'ville-manquante',
  InvalidDayCount = 'duree-invalide',
  PastStartDate = 'depart-passe',
  PlaceNotFound = 'lieu-introuvable',
}

export const TRIP_ERROR_MESSAGES: Record<TripError, string> = {
  [TripError.MissingCity]: 'Dis-moi où tu pars.',
  [TripError.InvalidDayCount]: `Choisis entre ${MIN_TRIP_DAYS} et ${MAX_TRIP_DAYS} jours.`,
  [TripError.PastStartDate]: 'Le départ ne peut pas être dans le passé.',
  [TripError.PlaceNotFound]: 'Ville introuvable (ou pas de connexion). Vérifie l’orthographe.',
};
