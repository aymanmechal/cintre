import type { Trip } from '../types/suitcase';
import type { DateRange } from '../../weather/types/weather';
import { toIsoDate } from '../../wardrobe/utils/wornDates';

export function addDays(isoDate: string, dayCount: number): string {
  const date = new Date(`${isoDate}T00:00:00`);
  date.setDate(date.getDate() + dayCount);
  return toIsoDate(date);
}

export function listTripDates(trip: Trip): string[] {
  return Array.from({ length: trip.dayCount }, (_, index) => addDays(trip.startDate, index));
}

export function toTripRange(trip: Trip): DateRange {
  return { startDate: trip.startDate, endDate: addDays(trip.startDate, trip.dayCount - 1) };
}

export function formatDayCount(dayCount: number): string {
  return `${dayCount} jour${dayCount > 1 ? 's' : ''}`;
}

export function formatTripTitle(trip: Trip): string {
  const startDate = new Date(`${trip.startDate}T00:00:00`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
  });
  return `${formatDayCount(trip.dayCount)} à ${trip.place.name}, dès le ${startDate}`;
}
