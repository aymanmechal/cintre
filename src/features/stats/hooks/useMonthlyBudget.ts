import { useState } from 'react';
import { useToday } from '../../../shared/hooks/useToday';
import { writeJsonToStorage } from '../../../shared/utils/storage';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { BUDGET_ERROR_MESSAGE, BUDGET_STORAGE_KEY } from '../constants/budget';
import {
  calculateBudgetUsage,
  loadBudget,
  parseBudget,
  selectMonthPurchases,
  sumMonthSpending,
  type BudgetUsage,
} from '../utils/budget';

export interface MonthlyBudgetState {
  budget: number | null;
  usage: BudgetUsage;
  purchaseCount: number;
  errorMessage: string | null;
  saveBudget: (text: string) => boolean;
  removeBudget: () => void;
}

export function useMonthlyBudget(): MonthlyBudgetState {
  const { items } = useWardrobe();
  const today = useToday();
  const [budget, setBudget] = useState(() => loadBudget(BUDGET_STORAGE_KEY));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function storeBudget(newBudget: number | null) {
    writeJsonToStorage(BUDGET_STORAGE_KEY, newBudget);
    setBudget(newBudget);
  }

  function saveBudget(text: string): boolean {
    const newBudget = parseBudget(text);
    setErrorMessage(newBudget === null ? BUDGET_ERROR_MESSAGE : null);
    if (newBudget !== null) storeBudget(newBudget);
    return newBudget !== null;
  }

  return {
    budget,
    usage: calculateBudgetUsage(budget ?? 0, sumMonthSpending(items, today)),
    purchaseCount: selectMonthPurchases(items, today).length,
    errorMessage,
    saveBudget,
    removeBudget: () => {
      setErrorMessage(null);
      storeBudget(null);
    },
  };
}
