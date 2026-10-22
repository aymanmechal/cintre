import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { OwnershipStatus } from '../constants/wardrobe';
import {
  compareByLeastRecentlyWorn,
  countDaysSince,
  countForgottenItems,
  formatCalendarDate,
  formatForgottenMessage,
  formatLastWorn,
  isForgotten,
  isFutureDate,
  isNewerWornDate,
  selectMostForgottenItems,
  toIsoDate,
} from './wornDates';

const TODAY = new Date(2025, 2, 15, 14, 30);

function daysAgo(days: number): string {
  return toIsoDate(new Date(2025, 2, 15 - days));
}

describe('toIsoDate et countDaysSince', () => {
  it('formate une date en AAAA-MM-JJ', () => {
    expect(toIsoDate(new Date(2025, 2, 5))).toBe('2025-03-05');
  });

  it("compte les jours écoulés sans tenir compte de l'heure", () => {
    expect(countDaysSince('2025-03-14', TODAY)).toBe(1);
    expect(countDaysSince('2025-03-15', TODAY)).toBe(0);
    expect(countDaysSince('2025-03-16', TODAY)).toBe(-1);
  });
});

describe('formatLastWorn', () => {
  it('dit jamais portée sans date', () => {
    expect(formatLastWorn(null, TODAY)).toBe('Jamais portée');
  });

  it("dit aujourd'hui, hier ou il y a n jours", () => {
    expect(formatLastWorn(daysAgo(0), TODAY)).toBe("Portée aujourd'hui");
    expect(formatLastWorn(daysAgo(1), TODAY)).toBe('Portée hier');
    expect(formatLastWorn(daysAgo(12), TODAY)).toBe('Portée il y a 12 jours');
  });
});

describe('isForgotten', () => {
  it('une pièce jamais portée est oubliée', () => {
    expect(isForgotten(makeWardrobeItem(), TODAY)).toBe(true);
  });

  it('la limite est de 30 jours exactement', () => {
    expect(isForgotten(makeWardrobeItem({}, { lastWornOn: daysAgo(30) }), TODAY)).toBe(false);
    expect(isForgotten(makeWardrobeItem({}, { lastWornOn: daysAgo(31) }), TODAY)).toBe(true);
  });

  it("une envie n'est jamais oubliée", () => {
    const wanted = makeWardrobeItem({}, { status: OwnershipStatus.Wanted });
    expect(isForgotten(wanted, TODAY)).toBe(false);
  });
});

describe('dates du futur et du port', () => {
  it('reconnaît une date future', () => {
    expect(isFutureDate('2025-03-16', TODAY)).toBe(true);
    expect(isFutureDate('2025-03-15', TODAY)).toBe(false);
  });

  it("une date n'en remplace une autre que si elle est plus récente", () => {
    expect(isNewerWornDate('2025-03-10', null)).toBe(true);
    expect(isNewerWornDate('2025-03-10', '2025-03-01')).toBe(true);
    expect(isNewerWornDate('2025-03-01', '2025-03-10')).toBe(false);
  });
});

describe('formatCalendarDate', () => {
  it("nomme aujourd'hui, hier et demain", () => {
    expect(formatCalendarDate('2025-03-15', TODAY)).toBe("Aujourd'hui");
    expect(formatCalendarDate('2025-03-14', TODAY)).toBe('Hier');
    expect(formatCalendarDate('2025-03-16', TODAY)).toBe('Demain');
  });

  it('écrit le jour en toutes lettres sinon', () => {
    expect(formatCalendarDate('2025-03-10', TODAY)).toBe('lundi 10 mars');
  });
});

describe('formatForgottenMessage', () => {
  it('accorde le verbe au singulier', () => {
    expect(formatForgottenMessage(1)).toBe(
      '1 pièce dort dans ta garde-robe. Et si tu les ressortais ?',
    );
  });

  it('accorde le verbe au pluriel', () => {
    expect(formatForgottenMessage(3)).toContain('3 pièces dorment');
  });
});

describe('pièces oubliées', () => {
  const NEVER = makeWardrobeItem({ id: 1 });
  const OLD = makeWardrobeItem({ id: 2 }, { lastWornOn: daysAgo(90) });
  const OLDER = makeWardrobeItem({ id: 3 }, { lastWornOn: daysAgo(120) });
  const RECENT = makeWardrobeItem({ id: 4 }, { lastWornOn: daysAgo(2) });
  const ITEMS = [RECENT, OLD, NEVER, OLDER];

  it('compte les pièces oubliées', () => {
    expect(countForgottenItems(ITEMS, TODAY)).toBe(3);
  });

  it("classe les plus oubliées d'abord, les jamais portées en tête", () => {
    expect(selectMostForgottenItems(ITEMS, TODAY, 3)).toEqual([NEVER, OLDER, OLD]);
  });

  it('respecte la limite demandée', () => {
    expect(selectMostForgottenItems(ITEMS, TODAY, 1)).toEqual([NEVER]);
  });

  it('compareByLeastRecentlyWorn met la date la plus ancienne en premier', () => {
    expect(compareByLeastRecentlyWorn(OLDER, OLD)).toBeLessThan(0);
  });
});
