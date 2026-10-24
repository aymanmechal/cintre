import { MAX_MONTHLY_BUDGET } from '../constants/budget';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { toIsoDate } from '../../wardrobe/utils/wornDates';
import { readJsonFromStorage } from '../../../shared/utils/storage';

export interface BudgetUsage {
  spent: number;
  remaining: number;
  isOver: boolean;
}

export function selectMonthPurchases(items: readonly WardrobeItem[], today: Date): WardrobeItem[] {
  const month = toIsoDate(today).slice(0, 7);
  return items.filter(
    (item) => item.status === OwnershipStatus.Owned && item.piece.boughtOn?.startsWith(month),
  );
}

export function sumMonthSpending(items: readonly WardrobeItem[], today: Date): number {
  return selectMonthPurchases(items, today).reduce((total, item) => total + item.piece.price, 0);
}

export function calculateBudgetUsage(budget: number, spent: number): BudgetUsage {
  return { spent, remaining: Math.abs(budget - spent), isOver: spent > budget };
}

export function isValidBudget(value: unknown): value is number {
  return typeof value === 'number' && value > 0 && value <= MAX_MONTHLY_BUDGET;
}

export function parseBudget(text: string): number | null {
  const value = Number(text.replace(',', '.'));
  return text.trim() !== '' && isValidBudget(value) ? value : null;
}

export function loadBudget(storageKey: string): number | null {
  const value = readJsonFromStorage(storageKey);
  return isValidBudget(value) ? value : null;
}
