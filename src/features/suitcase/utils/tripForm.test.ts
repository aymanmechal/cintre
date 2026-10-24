import { describe, expect, it } from 'vitest';
import { TripError } from '../constants/suitcase';
import { parseDayCount, validateTripForm } from './tripForm';

const TODAY = new Date(2026, 2, 10, 12, 0);
const FORM = { city: 'Lyon', startDate: '2026-03-10', dayCount: '3' };

describe('tripForm', () => {
  it('accepte un voyage qui part aujourd’hui', () => {
    expect(validateTripForm(FORM, TODAY)).toBeNull();
  });

  it('demande une destination', () => {
    expect(validateTripForm({ ...FORM, city: '  ' }, TODAY)).toBe(TripError.MissingCity);
  });

  it('limite la durée de 1 à 14 jours', () => {
    expect(parseDayCount('14')).toBe(14);
    expect(parseDayCount('0')).toBeNull();
    expect(parseDayCount('15')).toBeNull();
    expect(parseDayCount('2.5')).toBeNull();
    expect(validateTripForm({ ...FORM, dayCount: '' }, TODAY)).toBe(TripError.InvalidDayCount);
  });

  it('refuse un départ dans le passé', () => {
    expect(validateTripForm({ ...FORM, startDate: '2026-03-09' }, TODAY)).toBe(
      TripError.PastStartDate,
    );
  });
});
