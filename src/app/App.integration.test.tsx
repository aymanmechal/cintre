import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { makeOutfit, makeWardrobeItem } from '../test/factories';
import { renderApp } from '../test/renderApp';

describe('Navigation', () => {
  it('navigue entre les pages avec le menu', async () => {
    const { user } = renderApp('/');
    await user.click(screen.getByRole('link', { name: 'Catalogue' }));
    expect(
      await screen.findByRole('heading', { level: 1, name: /Catalogue/i }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Mes tenues' }));
    expect(screen.getByRole('heading', { level: 1, name: /Mes tenues/i })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Calendrier' }));
    expect(screen.getByRole('heading', { level: 1, name: /Calendrier/i })).toBeInTheDocument();
  });

  it('affiche une page « introuvable » pour une adresse inconnue', () => {
    renderApp('/nimporte-quoi');
    expect(screen.getByRole('heading', { name: 'Page introuvable' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Retour/ })).toHaveAttribute('href', '/');
  });

  it('met en avant la page courante dans le menu', () => {
    renderApp('/tenues');
    expect(screen.getByRole('link', { name: 'Mes tenues' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});

describe('Thème clair / sombre', () => {
  it('bascule en mode sombre et le mémorise', async () => {
    const { user } = renderApp('/');
    await user.click(screen.getByRole('button', { name: 'Passer en mode sombre' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('cintre.theme')).toBe('"dark"');
    await user.click(screen.getByRole('button', { name: 'Passer en mode clair' }));
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('reprend le thème mémorisé', () => {
    localStorage.setItem('cintre.theme', '"dark"');
    renderApp('/');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});

describe('Accueil', () => {
  it('affiche les chiffres de la garde-robe et des tenues', () => {
    renderApp('/', {
      wardrobe: [makeWardrobeItem({ id: 1 }), makeWardrobeItem({ id: 2 })],
      outfits: [makeOutfit()],
    });
    expect(screen.getByRole('link', { name: /2\s*pièces dans ma garde-robe/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /1\s*tenues composées/ })).toBeInTheDocument();
  });

  it('met en avant les pièces oubliées', () => {
    renderApp('/', { wardrobe: [makeWardrobeItem({ id: 1, title: 'Chemise lin' })] });
    expect(screen.getByRole('heading', { name: 'À ressortir cette semaine' })).toBeInTheDocument();
    expect(screen.getByText('Chemise lin')).toBeInTheDocument();
  });

  it("cache la section quand rien n'est oublié", () => {
    renderApp('/');
    expect(
      screen.queryByRole('heading', { name: 'À ressortir cette semaine' }),
    ).not.toBeInTheDocument();
  });
});
