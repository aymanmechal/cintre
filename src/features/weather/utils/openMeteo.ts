import { FORECAST_URL, GEOCODING_URL } from '../constants/weather';
import type { DateRange, WeatherPlace, WeatherSummary } from '../types/weather';
import { isRecord } from '../../../shared/utils/isRecord';
import { parseWeatherPlace } from './weatherPlace';

export function buildForecastUrl(place: WeatherPlace, { startDate, endDate }: DateRange): string {
  const params = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    daily: 'temperature_2m_min,temperature_2m_max,precipitation_probability_max',
    timezone: 'auto',
    start_date: startDate,
    end_date: endDate,
  });
  return `${FORECAST_URL}?${params}`;
}

export function buildGeocodingUrl(city: string): string {
  const params = new URLSearchParams({ name: city.trim(), count: '1', language: 'fr' });
  return `${GEOCODING_URL}?${params}`;
}

function toNumbers(values: unknown): number[] {
  return Array.isArray(values) ? values.filter((value) => typeof value === 'number') : [];
}

export function toWeatherSummary(json: unknown): WeatherSummary | null {
  if (!isRecord(json) || !isRecord(json.daily)) return null;
  const minTemperatures = toNumbers(json.daily.temperature_2m_min);
  const maxTemperatures = toNumbers(json.daily.temperature_2m_max);
  if (minTemperatures.length === 0 || maxTemperatures.length === 0) return null;
  return {
    minTemperature: Math.min(...minTemperatures),
    maxTemperature: Math.max(...maxTemperatures),
    rainProbability: Math.max(0, ...toNumbers(json.daily.precipitation_probability_max)),
  };
}

export function toWeatherPlace(json: unknown): WeatherPlace | null {
  if (!isRecord(json) || !Array.isArray(json.results)) return null;
  return parseWeatherPlace(json.results[0]);
}
