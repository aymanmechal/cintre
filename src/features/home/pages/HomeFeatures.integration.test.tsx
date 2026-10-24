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

describe('Accueil : défi et démo', () => {
  it('propose une pièce oubliée comme défi du jour', () => {
    const item = makeWardrobeItem({ id: 7, title: 'Veste oubliée' }, { lastWornOn: '2025-12-01' });
    renderApp('/', { wardrobe: [item] });

    const challenge = screen.getByRole('region', { name: 'Le défi du jour' });
    expect(challenge).toHaveTextContent('Veste oubliée');
    expect(screen.getByRole('link', { name: 'Trouver une tenue' })).toHaveAttribute(
      'href',
      '/tenues/idees/7',
    );
  });

  it('change de défi quand il y a le choix', async () => {
    const wardrobe = [
      makeWardrobeItem({ id: 1, title: 'Veste' }, { lastWornOn: '2025-12-01' }),
      makeWardrobeItem({ id: 2, title: 'Jupe' }, { lastWornOn: '2025-12-02' }),
    ];
    const { user } = renderApp('/', { wardrobe });
    const challenge = screen.getByRole('region', { name: 'Le défi du jour' });
    const before = challenge.textContent;

    await user.click(screen.getByRole('button', { name: 'Un autre défi' }));
    expect(challenge.textContent).not.toBe(before);
  });

  it("n'affiche pas de défi quand rien n'est oublié", () => {
    const item = makeWardrobeItem({ id: 1 }, { lastWornOn: '2026-03-14' });
    renderApp('/', { wardrobe: [item] });
    expect(screen.queryByRole('region', { name: 'Le défi du jour' })).not.toBeInTheDocument();
  });

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
