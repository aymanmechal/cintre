import { describe, expect, it } from 'vitest';
import { addDays, formatTripTitle, listTripDates, toTripRange } from './tripDates';

const TRIP = {
  place: { name: 'Lyon', latitude: 45.76, longitude: 4.84 },
  startDate: '2026-03-30',
  dayCount: 3,
};

describe('tripDates', () => {
  it('passe au mois suivant', () => {
    expect(addDays('2026-03-31', 1)).toBe('2026-04-01');
  });

  it('liste chaque jour du voyage', () => {
    expect(listTripDates(TRIP)).toEqual(['2026-03-30', '2026-03-31', '2026-04-01']);
    expect(toTripRange(TRIP)).toEqual({ startDate: '2026-03-30', endDate: '2026-04-01' });
  });

  it('résume le voyage', () => {
    expect(formatTripTitle(TRIP)).toBe('3 jours à Lyon, dès le 30 mars');
    expect(formatTripTitle({ ...TRIP, dayCount: 1 })).toMatch(/^1 jour à/);
  });
});
