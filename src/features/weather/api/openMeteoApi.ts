import type { DateRange, WeatherPlace, WeatherSummary } from '../types/weather';
import {
  buildForecastUrl,
  buildGeocodingUrl,
  toWeatherPlace,
  toWeatherSummary,
} from '../utils/openMeteo';

async function fetchJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Open-Meteo a répondu ${response.status}`);
  return response.json();
}

export async function fetchWeatherSummary(
  place: WeatherPlace,
  dates: DateRange,
  signal?: AbortSignal,
): Promise<WeatherSummary | null> {
  return toWeatherSummary(await fetchJson(buildForecastUrl(place, dates), signal));
}

export async function searchWeatherPlace(city: string): Promise<WeatherPlace | null> {
  if (city.trim() === '') return null;
  return toWeatherPlace(await fetchJson(buildGeocodingUrl(city)));
}
