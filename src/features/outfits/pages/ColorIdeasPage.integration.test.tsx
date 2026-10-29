import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { makeWardrobeItem } from '../../../test/factories';
import { renderApp } from '../../../test/renderApp';

const wardrobe = [
  makeWardrobeItem({
    id: 1,
    title: 'Haut rouge',
    pieceType: PieceType.Tops,
    color: PieceColor.Red,
  }),
  makeWardrobeItem({
    id: 2,
    title: 'Jean noir',
    pieceType: PieceType.Bottoms,
    color: PieceColor.Black,
  }),
];

describe('Tenue autour d’une couleur', () => {
  it('propose les couleurs de la garde-robe puis des idées', async () => {
    const { user } = renderApp('/tenues', { wardrobe });
    await user.click(await screen.findByText('🎨 Une tenue autour d’une couleur'));
    await user.click(screen.getByRole('link', { name: 'Rouge' }));
    expect(await screen.findByText('Des tenues construites autour du rouge')).toBeInTheDocument();
    expect(screen.getByText('Haut rouge')).toBeInTheDocument();
    expect(screen.getByText('Jean noir')).toBeInTheDocument();
  });

  it('masque une idée refusée et mémorise un j’aime', async () => {
    const { user } = renderApp('/tenues/couleur/rouge', { wardrobe });
    await user.click(await screen.findByRole('button', { name: 'J’aime cette idée' }));
    expect(screen.getByRole('button', { name: 'J’aime cette idée' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(localStorage.getItem('cintre.tastes')).toContain('1-2');
    await user.click(screen.getByRole('button', { name: 'Pas pour moi, masquer cette idée' }));
    expect(screen.queryByText('Haut rouge')).not.toBeInTheDocument();
  });

  it('refuse une couleur inconnue', () => {
    renderApp('/tenues/couleur/multicolore', { wardrobe });
    expect(screen.getByText('Pièce introuvable')).toBeInTheDocument();
  });
});
