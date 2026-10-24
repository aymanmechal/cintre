import { Season } from '../../../shared/pieces/constants/seasons';

export const WEATHER_PLACE_STORAGE_KEY = 'cintre.weatherPlace';

export const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

export const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const MY_POSITION_NAME = 'Ma position';

export const COORDINATE_DECIMALS = 2;

export const FORECAST_HORIZON_DAYS = 16;

export const GEOLOCATION_TIMEOUT_MS = 10_000;

export const HOT_FROM_TEMPERATURE = 22;

export const COLD_BELOW_TEMPERATURE = 12;

export const RAINY_FROM_PROBABILITY = 50;

export enum WeatherFeel {
  Hot = 'chaud',
  Mild = 'doux',
  Cold = 'froid',
}

export const WEATHER_FEEL_LABELS: Record<WeatherFeel, string> = {
  [WeatherFeel.Hot]: 'Il fait chaud',
  [WeatherFeel.Mild]: 'Il fait doux',
  [WeatherFeel.Cold]: 'Il fait froid',
};

export const WEATHER_FEEL_TIPS: Record<WeatherFeel, string> = {
  [WeatherFeel.Hot]: 'On met de côté les pièces d’hiver.',
  [WeatherFeel.Mild]: 'Toute ta garde-robe peut sortir.',
  [WeatherFeel.Cold]: 'On met de côté les pièces d’été.',
};

export const RAIN_TIP = 'Pluie probable : pas de chaussures d’été, pense au parapluie.';

export const SEASON_SET_ASIDE_BY_FEEL: Record<WeatherFeel, Season | null> = {
  [WeatherFeel.Hot]: Season.Winter,
  [WeatherFeel.Mild]: null,
  [WeatherFeel.Cold]: Season.Summer,
};

export enum WeatherError {
  LocationDenied = 'position-refusee',
  PlaceNotFound = 'lieu-introuvable',
  ForecastUnavailable = 'meteo-indisponible',
}

export const WEATHER_ERROR_MESSAGES: Record<WeatherError, string> = {
  [WeatherError.LocationDenied]: 'Position indisponible : tape plutôt le nom de ta ville.',
  [WeatherError.PlaceNotFound]: 'Ville introuvable (ou pas de connexion). Vérifie l’orthographe.',
  [WeatherError.ForecastUnavailable]: 'La météo ne répond pas pour le moment. Réessaie plus tard.',
};
