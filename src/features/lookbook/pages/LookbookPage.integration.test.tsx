import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Occasion } from '../../outfits/constants/occasions';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { renderApp } from '../../../test/renderApp';

const WARDROBE = [
  makeWardrobeItem({ id: 1, title: 'Pull rouge' }),
  makeWardrobeItem({ id: 2, title: 'Jean brut' }),
];
const OUTFITS = [
  makeOutfit({ id: 'a', name: 'Ancienne', pieceIds: [1, 2] }),
  makeOutfit({
    id: 'b',
    name: 'Récente',
    pieceIds: [1],
    occasion: Occasion.Party,
    note: 'Top soirée',
  }),
];

describe('Mon lookbook', () => {
  it('commence par la tenue la plus récente', () => {
    renderApp('/lookbook', { wardrobe: WARDROBE, outfits: OUTFITS });
    expect(screen.getByRole('article', { name: 'Récente' })).toHaveTextContent('Soirée');
    expect(screen.getByText('Top soirée')).toBeInTheDocument();
    expect(screen.getByText('Page 1 sur 2')).toBeInTheDocument();
  });

  it('se feuillette page par page', async () => {
    const { user } = renderApp('/lookbook', { wardrobe: WARDROBE, outfits: OUTFITS });
    await user.click(screen.getByRole('button', { name: /Suivant/ }));
    expect(screen.getByRole('article', { name: 'Ancienne' })).toHaveTextContent('Jean brut');
    expect(screen.getByRole('button', { name: /Suivant/ })).toBeDisabled();
  });

  it('propose d’enregistrer la tenue en image', () => {
    renderApp('/lookbook', { wardrobe: WARDROBE, outfits: OUTFITS });
    expect(
      screen.getByRole('button', { name: 'Enregistrer la tenue Récente en image' }),
    ).toBeInTheDocument();
  });

  it('invite à créer une tenue quand il n’y en a pas', () => {
    renderApp('/lookbook');
    expect(screen.getByText(/Ton lookbook se remplit/)).toBeInTheDocument();
  });
});
