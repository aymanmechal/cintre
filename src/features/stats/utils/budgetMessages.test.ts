import { describe, expect, it } from 'vitest';
import { formatBudgetMessage } from './budgetMessages';

function normalizeSpaces(text: string): string {
  return text.replace(/[\u00a0\u202f]/g, ' ');
}

describe('formatBudgetMessage', () => {
  it('dit ce qu’il reste', () => {
    const message = formatBudgetMessage(100, { spent: 65, remaining: 35, isOver: false }, 2);
    expect(normalizeSpaces(message)).toBe(
      '65,00 € dépensés sur 100,00 € (2 achats ce mois-ci). Il te reste 35,00 €.',
    );
  });

  it('prévient d’un dépassement', () => {
    const message = formatBudgetMessage(100, { spent: 130, remaining: 30, isOver: true }, 1);
    expect(normalizeSpaces(message)).toContain('(1 achat ce mois-ci). Dépassé de 30,00 €.');
  });

  it('gère le mois sans achat', () => {
    const message = formatBudgetMessage(50, { spent: 0, remaining: 50, isOver: false }, 0);
    expect(message).toContain('aucun achat ce mois-ci');
  });
});
