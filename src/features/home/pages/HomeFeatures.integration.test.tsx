import { screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { readStoredOutfits, readStoredWardrobe, renderApp } from '../../../test/renderApp';

const TODAY = new Date(2026, 2, 15, 12, 0);

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(TODAY);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Accueil : démo', () => {
  it('charge puis retire la garde-robe de démo', async () => {
    const { user } = renderApp('/');
    await user.click(screen.getByRole('button', { name: 'Essayer avec une démo' }));

    expect(readStoredWardrobe().length).toBeGreaterThan(0);
    expect(readStoredOutfits().length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: 'Essayer avec une démo' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Retirer la démo' }));
    expect(readStoredWardrobe()).toEqual([]);
    expect(readStoredOutfits()).toEqual([]);
  });

  it("n'affiche plus de défi du jour", () => {
    const item = makeWardrobeItem({ id: 7, title: 'Veste oubliée' }, { lastWornOn: '2025-12-01' });
    renderApp('/', { wardrobe: [item] });
    expect(screen.queryByRole('region', { name: 'Le défi du jour' })).not.toBeInTheDocument();
  });

  it("ne propose pas la démo quand la garde-robe n'est pas vide", () => {
    renderApp('/', { wardrobe: [makeWardrobeItem({ id: -5 })] });
    expect(screen.queryByRole('button', { name: 'Essayer avec une démo' })).not.toBeInTheDocument();
  });

  it("indique que tout est enregistré sur l'appareil", async () => {
    const { user } = renderApp('/');
    await user.click(screen.getByRole('button', { name: 'Essayer avec une démo' }));
    expect(screen.getByText(/Enregistré sur cet appareil/)).toBeInTheDocument();
  });
});
