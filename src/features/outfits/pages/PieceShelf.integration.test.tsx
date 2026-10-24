import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { makeWardrobeItem } from '../../../test/factories';
import { renderApp } from '../../../test/renderApp';

const TOPS = Array.from({ length: 8 }, (_, index) =>
  makeWardrobeItem({ id: index + 1, title: `Haut ${index + 1}`, pieceType: PieceType.Tops }),
);

function shelf(): HTMLElement {
  return screen.getByRole('region', { name: 'Choisis ton haut' });
}

describe('Créateur de tenues : choix des pièces', () => {
  it('montre 6 pièces par page puis la suite', async () => {
    const { user } = renderApp('/tenues', { wardrobe: TOPS });
    expect(within(shelf()).getByText('Haut 6')).toBeInTheDocument();
    expect(within(shelf()).queryByText('Haut 7')).not.toBeInTheDocument();

    await user.click(within(shelf()).getByRole('button', { name: 'Suivant →' }));
    expect(within(shelf()).getByText('Haut 7')).toBeInTheDocument();
    expect(within(shelf()).queryByText('Haut 1')).not.toBeInTheDocument();
  });

  it('cherche une pièce et revient à la première page', async () => {
    const { user } = renderApp('/tenues', { wardrobe: TOPS });
    await user.click(within(shelf()).getByRole('button', { name: 'Suivant →' }));
    await user.type(screen.getByLabelText('Rechercher une pièce'), 'haut 3');

    expect(within(shelf()).getByText('Haut 3')).toBeInTheDocument();
    expect(within(shelf()).queryByText('Haut 7')).not.toBeInTheDocument();
    expect(within(shelf()).queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('prévient quand aucune pièce ne correspond', async () => {
    const { user } = renderApp('/tenues', { wardrobe: TOPS });
    await user.type(screen.getByLabelText('Rechercher une pièce'), 'manteau');
    expect(screen.getByText('Aucune pièce ne correspond à « manteau ».')).toBeInTheDocument();
  });
});
