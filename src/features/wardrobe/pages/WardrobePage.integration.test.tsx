import { screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { makeWardrobeItem } from '../../../test/factories';
import { readStoredWardrobe, renderApp } from '../../../test/renderApp';
import { OwnershipStatus, StorageLocation } from '../constants/wardrobe';
import { toIsoDate } from '../utils/wornDates';

const TODAY = new Date(2026, 2, 15, 12, 0);

function isoDaysAgo(days: number): string {
  return toIsoDate(new Date(2026, 2, 15 - days));
}

const SHIRT = makeWardrobeItem({ id: 1, title: 'Chemise lin', thumbnail: '' });
const SHOES = makeWardrobeItem(
  { id: 2, title: 'Baskets', pieceType: PieceType.Shoes, thumbnail: '' },
  { location: StorageLocation.Drawer, lastWornOn: isoDaysAgo(2) },
);
const WISH = makeWardrobeItem(
  { id: 3, title: 'Montre dorée', pieceType: PieceType.Watches, thumbnail: '' },
  { status: OwnershipStatus.Wanted },
);
const ITEMS = [SHIRT, SHOES, WISH];

function cardOf(title: string): HTMLElement {
  return screen.getByRole('heading', { name: title }).closest('article') as HTMLElement;
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(TODAY);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Garde-robe : affichage', () => {
  it('invite à parcourir le catalogue quand elle est vide', () => {
    renderApp('/garde-robe');
    expect(screen.getByText('Ta garde-robe est vide')).toBeInTheDocument();
  });

  it('range les pièces possédées par rangement', () => {
    renderApp('/garde-robe', { wardrobe: ITEMS });
    expect(screen.getByRole('heading', { name: 'Armoire' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tiroir' })).toBeInTheDocument();
    expect(screen.queryByText('Montre dorée')).not.toBeInTheDocument();
  });

  it('affiche les compteurs des deux onglets', () => {
    renderApp('/garde-robe', { wardrobe: ITEMS });
    expect(screen.getByRole('button', { name: /Mes pièces\s*2/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Mes envies\s*1/ })).toBeInTheDocument();
  });

  it('montre les envies dans leur onglet', async () => {
    const { user } = renderApp('/garde-robe', { wardrobe: ITEMS });
    await user.click(screen.getByRole('button', { name: /Mes envies/ }));
    expect(screen.getByText('Montre dorée')).toBeInTheDocument();
    expect(screen.queryByText('Chemise lin')).not.toBeInTheDocument();
  });

  it('filtre par type', async () => {
    const { user } = renderApp('/garde-robe', { wardrobe: ITEMS });
    await user.selectOptions(screen.getByLabelText('Type'), 'chaussures');
    expect(screen.getByText('Baskets')).toBeInTheDocument();
    expect(screen.queryByText('Chemise lin')).not.toBeInTheDocument();
  });

  it('regroupe par type à la demande', async () => {
    const { user } = renderApp('/garde-robe', { wardrobe: ITEMS });
    await user.selectOptions(screen.getByLabelText('Ranger'), 'type');
    expect(screen.getByRole('heading', { name: 'Chemises' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Chaussures' })).toBeInTheDocument();
  });
});

describe('Garde-robe : pièces oubliées', () => {
  it('affiche la date de dernier port et le badge « À ressortir »', () => {
    renderApp('/garde-robe', { wardrobe: ITEMS });
    expect(within(cardOf('Chemise lin')).getByText('Jamais portée')).toBeInTheDocument();
    expect(within(cardOf('Chemise lin')).getByText('À ressortir')).toBeInTheDocument();
    expect(within(cardOf('Baskets')).getByText('Portée il y a 2 jours')).toBeInTheDocument();
    expect(within(cardOf('Baskets')).queryByText('À ressortir')).not.toBeInTheDocument();
  });

  it('affiche le bandeau de rappel au singulier', () => {
    renderApp('/garde-robe', { wardrobe: ITEMS });
    expect(screen.getByText(/1 pièce dort dans ta garde-robe/)).toBeInTheDocument();
  });

  it("trie les plus oubliées d'abord et masque le bandeau", async () => {
    const { user } = renderApp('/garde-robe', { wardrobe: ITEMS });
    await user.click(screen.getByRole('button', { name: 'Voir les plus oubliées' }));
    expect(screen.getByLabelText('Trier')).toHaveValue('oubliees');
    expect(screen.queryByText(/dort dans ta garde-robe/)).not.toBeInTheDocument();
  });
});

describe('Garde-robe : mode Modifier', () => {
  it("cache les boutons d'édition par défaut", () => {
    renderApp('/garde-robe', { wardrobe: ITEMS });
    expect(screen.queryByRole('link', { name: 'Modifier Chemise lin' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Portée aujourd'hui/ })).not.toBeInTheDocument();
  });

  it('les montre avec « Modifier » et les cache avec « Terminer »', async () => {
    const { user } = renderApp('/garde-robe', { wardrobe: ITEMS });
    await user.click(screen.getByRole('button', { name: 'Modifier' }));
    expect(screen.getByRole('link', { name: 'Modifier Chemise lin' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Terminer' }));
    expect(screen.queryByRole('link', { name: 'Modifier Chemise lin' })).not.toBeInTheDocument();
  });

  it("marque une pièce comme portée aujourd'hui et fait disparaître le rappel", async () => {
    const { user } = renderApp('/garde-robe', { wardrobe: ITEMS });
    await user.click(screen.getByRole('button', { name: 'Modifier' }));
    await user.click(
      within(cardOf('Chemise lin')).getByRole('button', { name: /Portée aujourd'hui/ }),
    );
    expect(
      within(cardOf('Chemise lin')).getByText("Portée aujourd'hui", { selector: 'p' }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/dort dans ta garde-robe/)).not.toBeInTheDocument();
    expect(readStoredWardrobe()[0].lastWornOn).toBe('2026-03-15');
  });

  it('retire une pièce de la garde-robe', async () => {
    const { user } = renderApp('/garde-robe', { wardrobe: ITEMS });
    await user.click(screen.getByRole('button', { name: 'Modifier' }));
    await user.click(screen.getByRole('button', { name: 'Retirer Chemise lin de ma garde-robe' }));
    expect(screen.queryByText('Chemise lin')).not.toBeInTheDocument();
    expect(readStoredWardrobe().map((item) => item.piece.id)).toEqual([2, 3]);
  });
});

describe('Garde-robe : sauvegarde', () => {
  it('recharge ce qui est dans le localStorage', () => {
    renderApp('/garde-robe', { wardrobe: [SHIRT] });
    expect(screen.getByText('Chemise lin')).toBeInTheDocument();
  });
});
