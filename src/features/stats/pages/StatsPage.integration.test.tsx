import { screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { renderApp } from '../../../test/renderApp';

const JEANS = makeWardrobeItem({ id: 1, title: 'Jean brut', price: 80, thumbnail: '' });
const COAT = makeWardrobeItem({ id: 2, title: 'Manteau laine', price: 200, thumbnail: '' });
const OUTFIT = makeOutfit({ id: 'o1', pieceIds: [1] });
const WORN_LOG = [
  { id: 'e1', date: '2026-03-10', outfitId: 'o1' },
  { id: 'e2', date: '2026-03-12', outfitId: 'o1' },
  { id: 'e3', date: '2026-03-14', outfitId: 'o1' },
  { id: 'e4', date: '2026-03-15', outfitId: 'o1' },
];
const OPTIONS = { wardrobe: [JEANS, COAT], outfits: [OUTFIT], wornLog: WORN_LOG };

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date(2026, 2, 15, 12, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Mes chiffres', () => {
  it('invite à remplir la garde-robe quand elle est vide', () => {
    renderApp('/chiffres');
    expect(screen.getByText('Ta garde-robe est vide')).toBeInTheDocument();
  });

  it('résume les dépenses, le coût moyen et les pièces jamais portées', () => {
    renderApp('/chiffres', OPTIONS);
    expect(screen.getByText('dépensés pour 2 pièces')).toBeInTheDocument();
    expect(screen.getByText(/280,00/)).toBeInTheDocument();
    expect(screen.getByText('par port en moyenne').previousSibling).toHaveTextContent('70,00');
    expect(screen.getByText('jamais portées').previousSibling).toHaveTextContent('1');
  });

  it('classe les pièces portées et celles à rentabiliser', () => {
    renderApp('/chiffres', OPTIONS);
    const best = screen.getByRole('heading', { name: 'Les plus rentables' }).parentElement!;
    expect(within(best).getByText(/Portée 4 fois · 20,00.* par port/)).toBeInTheDocument();
    const toAmortize = screen.getByRole('heading', { name: 'À rentabiliser' }).parentElement!;
    expect(within(toAmortize).getAllByRole('link')[0]).toHaveTextContent('Manteau laine');
  });
});

describe('Fiche pièce : coût par port', () => {
  it('affiche le coût par port d’une pièce portée', () => {
    renderApp('/garde-robe/1/modifier', OPTIONS);
    expect(screen.getByText(/Portée 4 fois · 20,00.* par port/)).toBeInTheDocument();
  });

  it('encourage à porter une pièce jamais portée', () => {
    renderApp('/garde-robe/2/modifier', OPTIONS);
    expect(screen.getByText(/Jamais portée · 200,00.* à rentabiliser/)).toBeInTheDocument();
  });
});
