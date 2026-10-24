import { RAIN_TIP, WEATHER_FEEL_LABELS, WEATHER_FEEL_TIPS } from '../constants/weather';
import type { WeatherSummary } from '../types/weather';
import { isRainy, toWeatherFeel } from './weatherOutfit';

export function formatTemperatureRange(weather: WeatherSummary): string {
  const min = Math.round(weather.minTemperature);
  const max = Math.round(weather.maxTemperature);
  return `${min} à ${max} °C`;
}

export function formatRainChance(weather: WeatherSummary): string {
  return `${Math.round(weather.rainProbability)} % de risque de pluie`;
}

export function formatWeatherFeel(weather: WeatherSummary): string {
  return WEATHER_FEEL_LABELS[toWeatherFeel(weather)];
}

export function buildWeatherTips(weather: WeatherSummary): string[] {
  const feelTip = WEATHER_FEEL_TIPS[toWeatherFeel(weather)];
  return isRainy(weather) ? [feelTip, RAIN_TIP] : [feelTip];
}
