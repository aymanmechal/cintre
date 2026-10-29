import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { openMyOutfitsTab, openOutfitMenu } from '../../../test/outfitsNavigation';
import { readStoredOutfits, renderApp } from '../../../test/renderApp';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import { MAX_ACCESSORIES_PER_OUTFIT } from '../constants/outfits';

const SHIRT = makeWardrobeItem({ id: 1, title: 'Chemise lin', thumbnail: '' });
const JEANS = makeWardrobeItem({
  id: 2,
  title: 'Jean brut',
  pieceType: PieceType.Bottoms,
  thumbnail: '',
});
const SHOES = makeWardrobeItem({
  id: 3,
  title: 'Derby noir',
  pieceType: PieceType.Shoes,
  thumbnail: '',
});
const WATCH = makeWardrobeItem({
  id: 4,
  title: 'Montre acier',
  pieceType: PieceType.Watches,
  thumbnail: '',
});
const GLASSES = makeWardrobeItem({
  id: 5,
  title: 'Lunettes noires',
  pieceType: PieceType.Sunglasses,
  thumbnail: '',
});
const WISH_WATCH = makeWardrobeItem(
  { id: 6, title: 'Montre dorée', pieceType: PieceType.Watches, thumbnail: '' },
  { status: OwnershipStatus.Wanted },
);
const BAG = makeWardrobeItem({
  id: 7,
  title: 'Sac cuir',
  pieceType: PieceType.Bags,
  thumbnail: '',
});
const RING = makeWardrobeItem({
  id: 8,
  title: 'Bague argent',
  pieceType: PieceType.Jewellery,
  thumbnail: '',
});
const ALL_ITEMS = [SHIRT, JEANS, SHOES, WATCH, GLASSES, WISH_WATCH];

function shelf(): HTMLElement {
  return screen.getByRole('region', { name: /^Choisis/ });
}

function slotTab(name: RegExp | string): HTMLElement {
  const tabs = screen.getByRole('group', { name: 'Type de pièce' });
  return within(tabs).getByRole('button', { name });
}

function preview(): HTMLElement {
  return screen.getByRole('complementary', { name: 'Ta tenue' });
}

describe('Tenues : démarrage', () => {
  it('invite à remplir la garde-robe quand elle est vide', () => {
    renderApp('/tenues');
    expect(screen.getByText('Ta garde-robe est vide')).toBeInTheDocument();
  });

  it('commence par le haut, avec un bouton grisé et une indication', () => {
    renderApp('/tenues', { wardrobe: ALL_ITEMS });
    expect(screen.getByRole('heading', { name: 'Choisis ton haut' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Créer la tenue' })).toBeDisabled();
    expect(screen.getByText('Choisis encore 2 pièces pour créer la tenue.')).toBeInTheDocument();
  });

  it('compte les pièces de chaque emplacement dans les onglets', () => {
    renderApp('/tenues', { wardrobe: ALL_ITEMS });
    expect(slotTab(/^Haut\s*1/)).toBeInTheDocument();
    expect(slotTab(/^Accessoire\s*3/)).toBeInTheDocument();
  });

  it('propose d’ajouter une pièce quand un emplacement est vide', async () => {
    const { user } = renderApp('/tenues', { wardrobe: [SHIRT] });
    await user.click(slotTab(/^Bas/));
    expect(within(shelf()).getByRole('link', { name: 'Ajouter une pièce' })).toBeInTheDocument();
  });
});

describe('Tenues : composer', () => {
  it("passe tout seul à l'emplacement suivant après chaque choix", async () => {
    const { user } = renderApp('/tenues', { wardrobe: ALL_ITEMS });
    await user.click(within(shelf()).getByRole('button', { name: /Chemise lin/ }));
    expect(screen.getByRole('heading', { name: 'Choisis ton bas' })).toBeInTheDocument();
    await user.click(within(shelf()).getByRole('button', { name: /Jean brut/ }));
    expect(screen.getByRole('heading', { name: 'Choisis tes chaussures' })).toBeInTheDocument();
  });

  it('active le bouton Créer dès que deux pièces sont choisies', async () => {
    const { user } = renderApp('/tenues', { wardrobe: ALL_ITEMS });
    await user.click(within(shelf()).getByRole('button', { name: /Chemise lin/ }));
    expect(screen.getByRole('button', { name: 'Créer la tenue' })).toBeDisabled();
    await user.click(within(shelf()).getByRole('button', { name: /Jean brut/ }));
    expect(screen.getByRole('button', { name: 'Créer la tenue' })).toBeEnabled();
  });

  it('retire une pièce avec la croix', async () => {
    const { user } = renderApp('/tenues', { wardrobe: ALL_ITEMS });
    await user.click(within(shelf()).getByRole('button', { name: /Chemise lin/ }));
    await user.click(within(preview()).getByRole('button', { name: 'Retirer Chemise lin' }));
    expect(
      within(preview()).queryByRole('button', { name: 'Retirer Chemise lin' }),
    ).not.toBeInTheDocument();
  });

  it('accepte plusieurs accessoires', async () => {
    const { user } = renderApp('/tenues', { wardrobe: ALL_ITEMS });
    await user.click(slotTab(/^Accessoire/));
    await user.click(within(shelf()).getByRole('button', { name: /Montre acier/ }));
    await user.click(within(shelf()).getByRole('button', { name: /Lunettes noires/ }));
    expect(
      within(preview()).getByRole('button', { name: 'Retirer Montre acier' }),
    ).toBeInTheDocument();
    expect(
      within(preview()).getByRole('button', { name: 'Retirer Lunettes noires' }),
    ).toBeInTheDocument();
    expect(
      within(preview()).getByRole('button', { name: /En ajouter un autre/ }),
    ).toBeInTheDocument();
  });

  it("limite le nombre d'accessoires", async () => {
    const accessories = [WATCH, GLASSES, BAG, RING, WISH_WATCH];
    const { user } = renderApp('/tenues', { wardrobe: accessories });
    await user.click(slotTab(/^Accessoire/));
    for (const title of [
      'Montre acier',
      'Lunettes noires',
      'Sac cuir',
      'Bague argent',
      'Montre dorée',
    ]) {
      await user.click(within(shelf()).getByRole('button', { name: new RegExp(title) }));
    }
    const removeButtons = within(preview()).getAllByRole('button', { name: /^Retirer/ });
    expect(removeButtons).toHaveLength(MAX_ACCESSORIES_PER_OUTFIT);
    expect(
      within(preview()).queryByRole('button', { name: 'Retirer Montre dorée' }),
    ).not.toBeInTheDocument();
  });
});

describe('Tenues : enregistrer', () => {
  it('crée une tenue prête avec le nom saisi et la range en dessous', async () => {
    const { user } = renderApp('/tenues', { wardrobe: ALL_ITEMS });
    await user.click(within(shelf()).getByRole('button', { name: /Chemise lin/ }));
    await user.click(within(shelf()).getByRole('button', { name: /Jean brut/ }));
    await user.type(screen.getByLabelText('Nom de la tenue'), 'Sortie du samedi');
    await user.click(screen.getByRole('button', { name: 'Créer la tenue' }));
    await openMyOutfitsTab(user);

    const list = screen.getByRole('region', { name: 'Mes tenues (1)' });
    expect(within(list).getByRole('heading', { name: 'Sortie du samedi' })).toBeInTheDocument();
    expect(within(list).getByText('Prête')).toBeInTheDocument();
    expect(readStoredOutfits()[0]).toMatchObject({ name: 'Sortie du samedi', pieceIds: [1, 2] });
  });

  it('remet le composeur à zéro après la création', async () => {
    const { user } = renderApp('/tenues', { wardrobe: ALL_ITEMS });
    await user.click(within(shelf()).getByRole('button', { name: /Chemise lin/ }));
    await user.click(within(shelf()).getByRole('button', { name: /Jean brut/ }));
    await user.click(screen.getByRole('button', { name: 'Créer la tenue' }));
    expect(screen.getByRole('button', { name: 'Créer la tenue' })).toBeDisabled();
    expect(screen.getByRole('heading', { name: 'Choisis ton haut' })).toBeInTheDocument();
  });

  it('donne un nom par défaut numéroté', async () => {
    const { user } = renderApp('/tenues', { wardrobe: ALL_ITEMS });
    await user.click(within(shelf()).getByRole('button', { name: /Chemise lin/ }));
    await user.click(within(shelf()).getByRole('button', { name: /Jean brut/ }));
    await user.click(screen.getByRole('button', { name: 'Créer la tenue' }));
    expect(readStoredOutfits()[0].name).toBe('Tenue n°1');
  });

  it('marque « Objectif » une tenue qui contient une envie, avec le prix à obtenir', async () => {
    const { user } = renderApp('/tenues', { wardrobe: ALL_ITEMS });
    await user.click(within(shelf()).getByRole('button', { name: /Chemise lin/ }));
    await user.click(slotTab(/^Accessoire/));
    await user.click(within(shelf()).getByRole('button', { name: /Montre dorée/ }));
    await user.click(screen.getByRole('button', { name: 'Créer la tenue' }));
    await openMyOutfitsTab(user);

    const list = screen.getByRole('region', { name: 'Mes tenues (1)' });
    expect(within(list).getByText('Objectif')).toBeInTheDocument();
    expect(within(list).getByText(/À obtenir/)).toBeInTheDocument();
  });
});

describe('Tenues : liste', () => {
  it("affiche un message quand il n'y a aucune tenue", async () => {
    const { user } = renderApp('/tenues', { wardrobe: ALL_ITEMS });
    await openMyOutfitsTab(user);
    expect(screen.getByText(/Aucune tenue pour l.instant/)).toBeInTheDocument();
  });

  it('supprime une tenue', async () => {
    const outfit = makeOutfit({ id: 'o1', name: 'Ancienne', pieceIds: [1, 2] });
    const { user } = renderApp('/tenues', { wardrobe: ALL_ITEMS, outfits: [outfit] });
    await openMyOutfitsTab(user);
    await openOutfitMenu(user, 'Ancienne');
    await user.click(screen.getByRole('button', { name: 'Supprimer la tenue Ancienne' }));
    expect(screen.getByText(/Aucune tenue pour l.instant/)).toBeInTheDocument();
    expect(readStoredOutfits()).toEqual([]);
  });

  it('ignore les pièces qui ne sont plus dans la garde-robe', async () => {
    const outfit = makeOutfit({ id: 'o1', name: 'Fantôme', pieceIds: [1, 999] });
    const { user } = renderApp('/tenues', { wardrobe: ALL_ITEMS, outfits: [outfit] });
    await openMyOutfitsTab(user);
    expect(screen.getByRole('heading', { name: 'Fantôme' })).toBeInTheDocument();
  });

  it('marque prête une tenue de pièces possédées', async () => {
    const outfit = makeOutfit({ id: 'o1', name: 'Prête', pieceIds: [1, 2] });
    const { user } = renderApp('/tenues', { wardrobe: ALL_ITEMS, outfits: [outfit] });
    await openMyOutfitsTab(user);
    expect(screen.getByText('Prête', { selector: 'span' })).toBeInTheDocument();
    expect(OwnershipStatus.Owned).toBe('owned');
  });
});
