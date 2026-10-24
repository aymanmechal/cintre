import { MAX_TRIP_DAYS, MIN_TRIP_DAYS, TripError } from '../constants/suitcase';
import type { TripForm } from '../types/suitcase';
import { isFutureDate, toIsoDate } from '../../wardrobe/utils/wornDates';

export function parseDayCount(text: string): number | null {
  const dayCount = Number(text);
  const isValid = Number.isInteger(dayCount) && dayCount >= MIN_TRIP_DAYS;
  return text.trim() !== '' && isValid && dayCount <= MAX_TRIP_DAYS ? dayCount : null;
}

function isPastDate(isoDate: string, today: Date): boolean {
  return isoDate !== toIsoDate(today) && !isFutureDate(isoDate, today);
}

export function validateTripForm(form: TripForm, today: Date): TripError | null {
  if (form.city.trim() === '') return TripError.MissingCity;
  if (parseDayCount(form.dayCount) === null) return TripError.InvalidDayCount;
  if (form.startDate === '' || isPastDate(form.startDate, today)) return TripError.PastStartDate;
  return null;
}
