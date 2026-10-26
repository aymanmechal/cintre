import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { renderApp } from '../../../test/renderApp';

describe('Mon profil de style', () => {
  it('invite à créer des tenues quand il manque de matière', () => {
    renderApp('/profil');
    expect(screen.getByText('Pas encore assez de matière')).toBeInTheDocument();
  });

  it('affiche le style, les couleurs et les pièces fétiches', () => {
    renderApp('/profil', {
      wardrobe: [
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
      ],
      outfits: [makeOutfit({ pieceIds: [1, 2] })],
    });
    expect(screen.getByText(/Une touche de couleur/)).toBeInTheDocument();
    expect(screen.getByText('Rouge')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Jean noir/ })).toHaveAttribute(
      'href',
      '/garde-robe/2/modifier',
    );
  });
});
