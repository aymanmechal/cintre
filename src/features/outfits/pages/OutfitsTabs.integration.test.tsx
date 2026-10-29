import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import {
  openCreateTab,
  openMoreOptions,
  openMyOutfitsTab,
  openOutfitMenu,
  outfitMenuSummary,
} from '../../../test/outfitsNavigation';
import { readStoredOutfits, renderApp } from '../../../test/renderApp';

const SHIRT = makeWardrobeItem({ id: 1, title: 'Chemise lin', thumbnail: '' });
const JEANS = makeWardrobeItem({
  id: 2,
  title: 'Jean brut',
  pieceType: PieceType.Bottoms,
  thumbnail: '',
});
const WARDROBE = [SHIRT, JEANS];
const COLORED_WARDROBE = [
  makeWardrobeItem({ id: 1, title: 'Haut rouge', color: PieceColor.Red, thumbnail: '' }),
  makeWardrobeItem({
    id: 2,
    title: 'Jean noir',
    pieceType: PieceType.Bottoms,
    color: PieceColor.Black,
    thumbnail: '',
  }),
];
const OUTFIT = makeOutfit({ id: 'o1', name: 'Sortie', pieceIds: [1, 2] });

function panelOf(tabName: string): HTMLElement {
  const panelId = screen.getByRole('tab', { name: tabName }).getAttribute('aria-controls') ?? '';
  const panel = document.getElementById(panelId);
  if (!panel) throw new Error(`Panneau introuvable pour l’onglet ${tabName}`);
  return panel;
}

function createPanel(): HTMLElement {
  return panelOf('Créer');
}

function listPanel(): HTMLElement {
  return panelOf('Mes tenues');
}

describe('Tenues : onglets', () => {
  it('affiche deux onglets nommés, Créer actif par défaut', () => {
    renderApp('/tenues', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    const tablist = screen.getByRole('tablist', { name: 'Tenues' });
    const create = within(tablist).getByRole('tab', { name: 'Créer' });
    const list = within(tablist).getByRole('tab', { name: 'Mes tenues' });
    expect(create).toHaveAttribute('aria-selected', 'true');
    expect(list).toHaveAttribute('aria-selected', 'false');
    expect(createPanel()).toBeVisible();
    expect(listPanel()).not.toBeVisible();
  });

  it('garde les deux panneaux montés et masque l’inactif avec hidden', () => {
    renderApp('/tenues', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    expect(screen.getAllByRole('tabpanel', { hidden: true })).toHaveLength(2);
    expect(listPanel()).toHaveAttribute('hidden');
    expect(createPanel()).not.toHaveAttribute('hidden');
  });

  it('bascule vers Mes tenues et affiche la liste', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    await openMyOutfitsTab(user);
    expect(screen.getByRole('tab', { name: 'Mes tenues' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('region', { name: 'Mes tenues (1)' })).toBeVisible();
    expect(createPanel()).not.toBeVisible();
    expect(screen.getByRole('heading', { level: 1, name: 'Mes tenues' })).toBeInTheDocument();
  });

  it('conserve la sélection du créateur après un aller-retour d’onglets', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    const shelf = screen.getByRole('region', { name: 'Choisis ton haut' });
    await user.click(within(shelf).getByRole('button', { name: /Chemise lin/ }));
    await openMyOutfitsTab(user);
    await openCreateTab(user);

    const preview = screen.getByRole('complementary', { name: 'Ta tenue' });
    expect(within(preview).getByRole('button', { name: 'Retirer Chemise lin' })).toBeVisible();
  });
});

describe('Tenues : zone d’idées', () => {
  it('regroupe les idées sous « Besoin d’idées ? »', () => {
    renderApp('/tenues', { wardrobe: COLORED_WARDROBE });
    const zone = screen.getByRole('region', { name: 'Besoin d’idées ?' });
    expect(within(zone).getByRole('button', { name: /Tenue aléatoire/ })).toBeVisible();
    expect(within(zone).getByText(/Une tenue autour d’une couleur/)).toBeVisible();
  });

  it('propose de garder les pièces choisies dans la zone d’idées', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE });
    const shelf = screen.getByRole('region', { name: 'Choisis ton haut' });
    await user.click(within(shelf).getByRole('button', { name: /Chemise lin/ }));
    const zone = screen.getByRole('region', { name: 'Besoin d’idées ?' });
    expect(within(zone).getByRole('link', { name: /Je garde 1 pièce/ })).toBeVisible();
  });

  it('laisse le nom et le bouton de création visibles sans rien ouvrir', () => {
    renderApp('/tenues', { wardrobe: WARDROBE });
    expect(screen.getByLabelText('Nom de la tenue')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Créer la tenue' })).toBeVisible();
  });
});

describe('Tenues : plus d’options', () => {
  it('cache le champ Occasion tant que « Plus d’options » est fermé', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE });
    expect(screen.getByText('Plus d’options').closest('details')).not.toHaveAttribute('open');
    expect(screen.getByLabelText('Occasion (facultatif)')).not.toBeVisible();

    await openMoreOptions(user);
    expect(screen.getByLabelText('Occasion (facultatif)')).toBeVisible();
  });
});

describe('Tenues : menu de la carte', () => {
  it('replie les actions et les montre après clic sur le menu', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    await openMyOutfitsTab(user);
    expect(outfitMenuSummary('Sortie')).toHaveTextContent('⋯');
    expect(outfitMenuSummary('Sortie').closest('details')).not.toHaveAttribute('open');
    expect(screen.getByRole('button', { name: 'Supprimer la tenue Sortie' })).not.toBeVisible();

    await openOutfitMenu(user, 'Sortie');
    expect(screen.getByRole('button', { name: 'Supprimer la tenue Sortie' })).toBeVisible();
    expect(screen.getByLabelText('Comparer Sortie')).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Enregistrer la tenue Sortie en image' }),
    ).toBeVisible();
  });

  it('garde le nom, le badge et les pièces visibles sans ouvrir le menu', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    await openMyOutfitsTab(user);
    const card = screen.getByRole('article');
    expect(within(card).getByRole('heading', { name: 'Sortie' })).toBeVisible();
    expect(within(card).getByText('Prête')).toBeVisible();
  });

  it('supprime une tenue depuis le menu', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE, outfits: [OUTFIT] });
    await openMyOutfitsTab(user);
    await openOutfitMenu(user, 'Sortie');
    await user.click(screen.getByRole('button', { name: 'Supprimer la tenue Sortie' }));
    expect(screen.getByText(/Aucune tenue pour l.instant/)).toBeInTheDocument();
    expect(readStoredOutfits()).toEqual([]);
  });
});

describe('Tenues : cas limites', () => {
  it('n’affiche pas d’onglets quand la garde-robe est vide', () => {
    renderApp('/tenues');
    expect(screen.getByText('Ta garde-robe est vide')).toBeInTheDocument();
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  });

  it('prévient quand il n’y a aucune tenue', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE });
    await openMyOutfitsTab(user);
    expect(screen.getByText(/Aucune tenue pour l.instant/)).toBeVisible();
  });
});
