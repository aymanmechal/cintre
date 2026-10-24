import { COORDINATE_DECIMALS, WEATHER_PLACE_STORAGE_KEY } from '../constants/weather';
import type { DateRange, WeatherPlace } from '../types/weather';
import { isRecord } from '../../../shared/utils/isRecord';
import { readJsonFromStorage } from '../../../shared/utils/storage';

export function parseWeatherPlace(value: unknown): WeatherPlace | null {
  if (!isRecord(value)) return null;
  const { name, latitude, longitude } = value;
  if (typeof name !== 'string' || typeof latitude !== 'number' || typeof longitude !== 'number') {
    return null;
  }
  return { name, latitude, longitude };
}

export function loadWeatherPlace(): WeatherPlace | null {
  return parseWeatherPlace(readJsonFromStorage(WEATHER_PLACE_STORAGE_KEY));
}

export function roundCoordinate(coordinate: number): number {
  return Number(coordinate.toFixed(COORDINATE_DECIMALS));
}

export function toForecastKey(place: WeatherPlace, { startDate, endDate }: DateRange): string {
  return `${place.latitude},${place.longitude},${startDate},${endDate}`;
}
