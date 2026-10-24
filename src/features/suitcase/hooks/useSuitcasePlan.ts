import type { SuitcasePlan, Trip } from '../types/suitcase';
import { buildSuitcasePlan } from '../utils/packing';
import { listTripDates, toTripRange } from '../utils/tripDates';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { useWeatherForecast } from '../../weather/hooks/useWeatherForecast';
import type { WeatherSummary } from '../../weather/types/weather';
import { isWithinForecast } from '../../weather/utils/dateRange';
import { useToday } from '../../../shared/hooks/useToday';

export interface SuitcasePlanState {
  plan: SuitcasePlan | null;
  weather: WeatherSummary | null;
  isLoading: boolean;
  hasFailed: boolean;
  isTooFarAhead: boolean;
}

export function useSuitcasePlan(trip: Trip): SuitcasePlanState {
  const { items } = useWardrobe();
  const today = useToday();
  const range = toTripRange(trip);
  const isTooFarAhead = !isWithinForecast(range, today);
  const { weather, isLoading, hasFailed } = useWeatherForecast(
    isTooFarAhead ? null : trip.place,
    range,
  );

  return {
    plan: isLoading ? null : buildSuitcasePlan(items, listTripDates(trip), weather),
    weather,
    isLoading,
    hasFailed,
    isTooFarAhead,
  };
}
