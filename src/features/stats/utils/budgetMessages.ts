import { formatPrice } from '../../../shared/utils/format';
import type { BudgetUsage } from './budget';

function formatPurchaseCount(count: number): string {
  if (count === 0) return 'aucun achat ce mois-ci';
  return `${count} achat${count > 1 ? 's' : ''} ce mois-ci`;
}

export function formatBudgetMessage(
  budget: number,
  usage: BudgetUsage,
  purchaseCount: number,
): string {
  const summary = `${formatPrice(usage.spent)} dépensés sur ${formatPrice(budget)} (${formatPurchaseCount(purchaseCount)})`;
  const status = usage.isOver
    ? `Dépassé de ${formatPrice(usage.remaining)}.`
    : `Il te reste ${formatPrice(usage.remaining)}.`;
  return `${summary}. ${status}`;
}
