import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import {
  calculateBudgetUsage,
  loadBudget,
  parseBudget,
  selectMonthPurchases,
  sumMonthSpending,
} from './budget';

const TODAY = new Date(2026, 2, 15, 12, 0);
const BOUGHT_NOW = makeWardrobeItem({ id: 1, price: 40, boughtOn: '2026-03-02' });
const BOUGHT_LATER = makeWardrobeItem({ id: 2, price: 25, boughtOn: '2026-03-30' });
const BOUGHT_BEFORE = makeWardrobeItem({ id: 3, price: 90, boughtOn: '2026-02-28' });
const BOUGHT_LAST_YEAR = makeWardrobeItem({ id: 4, price: 10, boughtOn: '2025-03-10' });
const NO_DATE = makeWardrobeItem({ id: 5, price: 50, boughtOn: null });
const WANTED = makeWardrobeItem(
  { id: 6, price: 70, boughtOn: '2026-03-05' },
  { status: OwnershipStatus.Wanted },
);
const ALL = [BOUGHT_NOW, BOUGHT_LATER, BOUGHT_BEFORE, BOUGHT_LAST_YEAR, NO_DATE, WANTED];

describe('budget', () => {
  it('ne compte que les pièces possédées achetées ce mois-ci', () => {
    expect(selectMonthPurchases(ALL, TODAY)).toEqual([BOUGHT_NOW, BOUGHT_LATER]);
    expect(sumMonthSpending(ALL, TODAY)).toBe(65);
  });

  it('calcule ce qu’il reste ou le dépassement', () => {
    expect(calculateBudgetUsage(100, 65)).toEqual({ spent: 65, remaining: 35, isOver: false });
    expect(calculateBudgetUsage(100, 130)).toEqual({ spent: 130, remaining: 30, isOver: true });
    expect(calculateBudgetUsage(100, 100).isOver).toBe(false);
  });

  it('lit un montant, avec une virgule ou un point', () => {
    expect(parseBudget('120')).toBe(120);
    expect(parseBudget('99,5')).toBe(99.5);
    expect(parseBudget(' 80.25 ')).toBe(80.25);
  });

  it.each(['', '  ', '0', '-5', 'abc', '100001'])('refuse %j', (text) => {
    expect(parseBudget(text)).toBeNull();
  });

  it('relit un budget enregistré et ignore le reste', () => {
    localStorage.setItem('test.budget', '150');
    expect(loadBudget('test.budget')).toBe(150);
    localStorage.setItem('test.budget', '"texte"');
    expect(loadBudget('test.budget')).toBeNull();
    localStorage.setItem('test.budget', '-3');
    expect(loadBudget('test.budget')).toBeNull();
    expect(loadBudget('test.absent')).toBeNull();
  });
});
