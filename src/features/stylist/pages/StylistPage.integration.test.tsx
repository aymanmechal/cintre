import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { readStoredOutfits, renderApp } from '../../../test/renderApp';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { askStylist } from '../api/stylistApi';

vi.mock('../api/stylistApi', () => ({ askStylist: vi.fn() }));

const WARDROBE = [
  makeWardrobeItem({ id: 1, title: 'Pull rouge', pieceType: PieceType.Tops }),
  makeWardrobeItem({ id: 2, title: 'Jean brut', pieceType: PieceType.Bottoms }),
];

describe('Mon styliste', () => {
  it('est accessible depuis le créateur de tenues', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE });
    await user.click(screen.getByRole('link', { name: /Demander au styliste/ }));
    expect(screen.getByRole('heading', { name: 'Mon styliste', level: 1 })).toBeInTheDocument();
  });

  it('compose une tenue avec mes pièces et permet de la garder', async () => {
    vi.mocked(askStylist).mockResolvedValue({
      pieceIds: [1, 2, 404],
      explanation: 'Le rouge réveille le jean.',
    });
    const { user } = renderApp('/styliste', { wardrobe: WARDROBE });
    await user.click(screen.getByRole('button', { name: /Chic mais confortable/ }));
    await user.click(screen.getByRole('button', { name: /Compose-moi une tenue/ }));

    expect(await screen.findByText(/Le rouge réveille le jean/)).toBeInTheDocument();
    expect(askStylist).toHaveBeenCalledWith(
      'Chic mais confortable, avec une touche de couleur',
      expect.arrayContaining([expect.objectContaining({ id: 1, name: 'Pull rouge' })]),
    );
    await user.click(screen.getByRole('button', { name: 'Garder cette tenue' }));
    await waitFor(() => expect(readStoredOutfits()[0]?.pieceIds).toEqual([1, 2]));
  });

  it('prévient si le styliste ne répond pas', async () => {
    vi.mocked(askStylist).mockRejectedValue(new Error('hors ligne'));
    const { user } = renderApp('/styliste', { wardrobe: WARDROBE });
    await user.type(screen.getByLabelText(/De quoi as-tu envie/), 'un look sport');
    await user.click(screen.getByRole('button', { name: /Compose-moi une tenue/ }));
    expect(await screen.findByText(/Le styliste est indisponible/)).toBeInTheDocument();
  });

  it('demande d’abord des pièces si l’armoire est vide', () => {
    renderApp('/styliste');
    expect(screen.getByText(/Ajoute d’abord quelques pièces/)).toBeInTheDocument();
  });
});
