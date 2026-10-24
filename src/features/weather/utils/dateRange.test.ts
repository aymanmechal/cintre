import { describe, expect, it } from 'vitest';
import { buildDayRange, isWithinForecast } from './dateRange';

const TODAY = new Date(2026, 2, 10, 12, 0);

describe('dateRange', () => {
  it('couvre une seule journée', () => {
    expect(buildDayRange(TODAY)).toEqual({ startDate: '2026-03-10', endDate: '2026-03-10' });
  });

  it('sait si la météo est déjà connue pour ces dates', () => {
    expect(isWithinForecast({ startDate: '2026-03-20', endDate: '2026-03-25' }, TODAY)).toBe(true);
    expect(isWithinForecast({ startDate: '2026-03-24', endDate: '2026-03-26' }, TODAY)).toBe(false);
  });
});
