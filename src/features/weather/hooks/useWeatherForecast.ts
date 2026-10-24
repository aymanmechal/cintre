import { useEffect, useState } from 'react';
import { fetchWeatherSummary } from '../api/openMeteoApi';
import type { DateRange, WeatherPlace, WeatherSummary } from '../types/weather';
import { toForecastKey } from '../utils/weatherPlace';

interface ForecastResult {
  forecastKey: string;
  weather: WeatherSummary | null;
}

export interface WeatherForecastState {
  weather: WeatherSummary | null;
  isLoading: boolean;
  hasFailed: boolean;
}

export function useWeatherForecast(
  place: WeatherPlace | null,
  { startDate, endDate }: DateRange,
): WeatherForecastState {
  const [result, setResult] = useState<ForecastResult | null>(null);
  const forecastKey = place === null ? null : toForecastKey(place, { startDate, endDate });

  useEffect(() => {
    if (place === null) return;
    const controller = new AbortController();
    const dates = { startDate, endDate };
    const showResult = (weather: WeatherSummary | null) =>
      setResult({ forecastKey: toForecastKey(place, dates), weather });
    fetchWeatherSummary(place, dates, controller.signal)
      .then(showResult)
      .catch(() => {
        if (!controller.signal.aborted) showResult(null);
      });
    return () => controller.abort();
  }, [place, startDate, endDate]);

  const current = result?.forecastKey === forecastKey ? result : null;
  return {
    weather: current?.weather ?? null,
    isLoading: forecastKey !== null && current === null,
    hasFailed: current !== null && current.weather === null,
  };
}
