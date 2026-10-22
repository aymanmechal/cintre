import { describe, expect, it } from 'vitest';
import {
  buildMonthGrid,
  formatFullDate,
  formatMonthTitle,
  monthOfDate,
  monthOfIsoDate,
  shiftMonth,
} from './calendarMonth';

const OCTOBER_2026 = { year: 2026, month: 9 };

describe('buildMonthGrid', () => {
  it('commence le lundi et finit le dimanche', () => {
    const days = buildMonthGrid(OCTOBER_2026);
    expect(days[0].isoDate).toBe('2026-09-28');
    expect(days.at(-1)?.isoDate).toBe('2026-11-01');
    expect(days).toHaveLength(35);
  });

  it('marque les jours du mois affiché', () => {
    const days = buildMonthGrid(OCTOBER_2026);
    expect(days.filter((day) => day.isCurrentMonth)).toHaveLength(31);
    expect(days[0].isCurrentMonth).toBe(false);
    expect(days[3]).toMatchObject({ isoDate: '2026-10-01', dayNumber: 1, isCurrentMonth: true });
  });

  it("n'ajoute pas de semaine vide quand le mois tient en 4 semaines", () => {
    expect(buildMonthGrid({ year: 2027, month: 1 })).toHaveLength(28);
  });

  it('ajoute une sixième semaine quand le mois commence un dimanche', () => {
    expect(buildMonthGrid({ year: 2026, month: 2 })).toHaveLength(42);
  });

  it('garde cinq semaines pour un mois qui commence un mercredi', () => {
    expect(buildMonthGrid({ year: 2026, month: 3 })).toHaveLength(35);
  });
});

describe('navigation entre les mois', () => {
  it('passe au mois suivant et précédent', () => {
    expect(shiftMonth(OCTOBER_2026, 1)).toEqual({ year: 2026, month: 10 });
    expect(shiftMonth(OCTOBER_2026, -1)).toEqual({ year: 2026, month: 8 });
  });

  it("change d'année en décembre et en janvier", () => {
    expect(shiftMonth({ year: 2025, month: 11 }, 1)).toEqual({ year: 2026, month: 0 });
    expect(shiftMonth({ year: 2026, month: 0 }, -1)).toEqual({ year: 2025, month: 11 });
  });

  it("retrouve le mois d'une date", () => {
    expect(monthOfIsoDate('2026-10-22')).toEqual(OCTOBER_2026);
    expect(monthOfDate(new Date(2026, 9, 22))).toEqual(OCTOBER_2026);
  });
});

describe('formats', () => {
  it('écrit le titre du mois', () => {
    expect(formatMonthTitle(OCTOBER_2026)).toBe('octobre 2026');
  });

  it('écrit la date en toutes lettres', () => {
    expect(formatFullDate('2026-10-22')).toBe('jeudi 22 octobre');
  });
});
