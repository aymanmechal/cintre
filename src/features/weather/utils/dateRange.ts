import { FORECAST_HORIZON_DAYS } from '../constants/weather';
import type { DateRange } from '../types/weather';
import { countDaysSince, toIsoDate } from '../../wardrobe/utils/wornDates';

export function buildDayRange(date: Date): DateRange {
  const isoDate = toIsoDate(date);
  return { startDate: isoDate, endDate: isoDate };
}

export function isWithinForecast({ endDate }: DateRange, today: Date): boolean {
  return -countDaysSince(endDate, today) < FORECAST_HORIZON_DAYS;
}
