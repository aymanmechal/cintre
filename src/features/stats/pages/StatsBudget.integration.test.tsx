import { screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { renderApp } from '../../../test/renderApp';
import { BUDGET_STORAGE_KEY } from '../constants/budget';

const THIS_MONTH = makeWardrobeItem({ id: 1, price: 60, boughtOn: '2026-03-02' });
const OLD = makeWardrobeItem({ id: 2, price: 200, boughtOn: '2025-12-01' });
const WARDROBE = [THIS_MONTH, OLD];

function storedBudget(): unknown {
  return JSON.parse(localStorage.getItem(BUDGET_STORAGE_KEY) ?? 'null');
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date(2026, 2, 15, 12, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Mes chiffres : budget du mois', () => {
  it('invite à fixer un budget quand il n’y en a pas', () => {
    renderApp('/chiffres', { wardrobe: WARDROBE });
    expect(screen.getByText(/Fixe un montant pour les vêtements/)).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('enregistre un budget et montre ce qu’il reste', async () => {
    const { user } = renderApp('/chiffres', { wardrobe: WARDROBE });
    await user.type(screen.getByLabelText('Budget mensuel (€)'), '100');
    await user.click(screen.getByRole('button', { name: 'Fixer le budget' }));

    expect(storedBudget()).toBe(100);
    const progress = screen.getByRole('progressbar', { name: 'Budget du mois utilisé' });
    expect(progress).toHaveAttribute('value', '60');
    expect(screen.getByText(/1 achat ce mois-ci\)\. Il te reste 40,00/)).toBeInTheDocument();
    expect(screen.getByLabelText('Budget mensuel (€)')).toHaveValue(null);
  });

  it('prévient quand le budget est dépassé', async () => {
    const { user } = renderApp('/chiffres', { wardrobe: WARDROBE });
    await user.type(screen.getByLabelText('Budget mensuel (€)'), '50');
    await user.click(screen.getByRole('button', { name: 'Fixer le budget' }));

    expect(screen.getByText(/Dépassé de 10,00/)).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '50');
  });

  it('refuse un montant invalide', async () => {
    const { user } = renderApp('/chiffres', { wardrobe: WARDROBE });
    await user.type(screen.getByLabelText('Budget mensuel (€)'), '0');
    await user.click(screen.getByRole('button', { name: 'Fixer le budget' }));

    expect(screen.getByText(/Entre un montant entre 1 et/)).toBeInTheDocument();
    expect(storedBudget()).toBeNull();
  });

  it('retrouve le budget enregistré', () => {
    localStorage.setItem(BUDGET_STORAGE_KEY, '150');
    renderApp('/chiffres', { wardrobe: WARDROBE });
    expect(screen.getByText(/Il te reste 90,00/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Modifier' })).toBeInTheDocument();
  });

  it('modifie puis retire le budget', async () => {
    localStorage.setItem(BUDGET_STORAGE_KEY, '150');
    const { user } = renderApp('/chiffres', { wardrobe: WARDROBE });
    await user.type(screen.getByLabelText('Budget mensuel (€)'), '80');
    await user.click(screen.getByRole('button', { name: 'Modifier' }));
    expect(storedBudget()).toBe(80);

    await user.click(screen.getByRole('button', { name: 'Retirer le budget' }));
    expect(storedBudget()).toBeNull();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
