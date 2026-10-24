import type { WeatherPlace } from '../types/weather';
import { buildDayRange } from '../utils/dateRange';
import { useWeatherForecast, type WeatherForecastState } from './useWeatherForecast';
import { useToday } from '../../../shared/hooks/useToday';

export function useTodayForecast(place: WeatherPlace | null): WeatherForecastState {
  return useWeatherForecast(place, buildDayRange(useToday()));
}
