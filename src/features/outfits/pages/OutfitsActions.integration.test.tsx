import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { readStoredOutfits, renderApp } from '../../../test/renderApp';

const SHIRT = makeWardrobeItem({ id: 1, title: 'Chemise lin', thumbnail: '' });
const JEANS = makeWardrobeItem({
  id: 2,
  title: 'Jean brut',
  pieceType: PieceType.Bottoms,
  thumbnail: '',
});
const CHINO = makeWardrobeItem({
  id: 3,
  title: 'Chino beige',
  pieceType: PieceType.Bottoms,
  thumbnail: '',
});
const OUTFIT = makeOutfit({ id: 'o1', name: 'Sortie', pieceIds: [1, 2] });

function card(): HTMLElement {
  return screen.getByRole('article');
}

describe('Tenues : actions sur une tenue', () => {
  it('duplique une tenue en variante', async () => {
    const { user } = renderApp('/tenues', { wardrobe: [SHIRT, JEANS], outfits: [OUTFIT] });
    await user.click(screen.getByRole('button', { name: 'Dupliquer la tenue Sortie' }));
    expect(readStoredOutfits().map((outfit) => outfit.name)).toEqual([
      'Sortie (variante)',
      'Sortie',
    ]);
  });

  it('remplace juste une pièce par une autre du même type', async () => {
    const { user } = renderApp('/tenues', { wardrobe: [SHIRT, JEANS, CHINO], outfits: [OUTFIT] });
    await user.click(within(card()).getByRole('button', { name: 'Remplacer Jean brut' }));
    expect(readStoredOutfits()[0].pieceIds).toEqual([1, 3]);
  });

  it("ne propose pas de remplacement quand il n'y a pas d'autre pièce", () => {
    renderApp('/tenues', { wardrobe: [SHIRT, JEANS], outfits: [OUTFIT] });
    expect(screen.queryByRole('button', { name: /^Remplacer/ })).not.toBeInTheDocument();
  });

  it('enregistre un score, qu’on peut retirer en recliquant', async () => {
    const { user } = renderApp('/tenues', { wardrobe: [SHIRT, JEANS], outfits: [OUTFIT] });
    await user.click(screen.getByText(/^Note et score/));
    await user.click(screen.getByRole('button', { name: '4 sur 5' }));
    expect(readStoredOutfits()[0].score).toBe(4);
    await user.click(screen.getByRole('button', { name: '4 sur 5' }));
    expect(readStoredOutfits()[0].score).toBe(0);
  });

  it('enregistre une note perso', async () => {
    const { user } = renderApp('/tenues', { wardrobe: [SHIRT, JEANS], outfits: [OUTFIT] });
    await user.click(screen.getByText(/^Note et score/));
    await user.type(screen.getByLabelText('Note perso'), 'Top');
    expect(readStoredOutfits()[0].note).toBe('Top');
  });
});

describe('Tenues : aléatoire', () => {
  it('remplit le créateur avec une idée', async () => {
    const { user } = renderApp('/tenues', { wardrobe: [SHIRT, JEANS] });
    await user.click(screen.getByRole('button', { name: /Tenue aléatoire/ }));
    expect(screen.getByRole('button', { name: 'Créer la tenue' })).toBeEnabled();
  });

  it('prévient quand il manque des pièces', async () => {
    const { user } = renderApp('/tenues', { wardrobe: [SHIRT] });
    await user.click(screen.getByRole('button', { name: /Tenue aléatoire/ }));
    expect(screen.getByRole('status')).toHaveTextContent('Pas assez de pièces');
  });
});
