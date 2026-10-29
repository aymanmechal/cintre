import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { makeWardrobeItem } from '../../../test/factories';
import { readStoredWardrobe, renderApp } from '../../../test/renderApp';

const SCARF = makeWardrobeItem({
  id: 1,
  title: 'Écharpe rouge',
  thumbnail: '',
  color: PieceColor.Red,
  tags: ['noel'],
});
const TEE = makeWardrobeItem({
  id: 2,
  title: 'T-shirt bleu',
  thumbnail: '',
  color: PieceColor.Blue,
});

function isShown(title: string): boolean {
  return screen.queryByRole('heading', { name: title }) !== null;
}

describe('Garde-robe : recherche et filtres', () => {
  it('filtre les pièces pendant la saisie', async () => {
    const { user } = renderApp('/garde-robe', { wardrobe: [SCARF, TEE] });
    await user.type(screen.getByLabelText('Rechercher'), 'echarpe');
    expect(isShown('Écharpe rouge')).toBe(true);
    expect(isShown('T-shirt bleu')).toBe(false);
  });

  it('filtre par couleur', async () => {
    const { user } = renderApp('/garde-robe', { wardrobe: [SCARF, TEE] });
    await user.click(within(screen.getByRole('group', { name: 'Couleur' })).getByText('Bleu'));
    expect(isShown('T-shirt bleu')).toBe(true);
    expect(isShown('Écharpe rouge')).toBe(false);
  });

  it('filtre par tag', async () => {
    const { user } = renderApp('/garde-robe', { wardrobe: [SCARF, TEE] });
    await user.selectOptions(screen.getByLabelText('Tag'), 'noel');
    expect(isShown('Écharpe rouge')).toBe(true);
    expect(isShown('T-shirt bleu')).toBe(false);
  });

  it('propose d’effacer les filtres quand rien ne correspond', async () => {
    const { user } = renderApp('/garde-robe', { wardrobe: [SCARF, TEE] });
    await user.type(screen.getByLabelText('Rechercher'), 'zzz');
    expect(screen.getByText('Aucune pièce trouvée')).toBeInTheDocument();
    const [clearFilters] = screen.getAllByRole('button', { name: 'Effacer les filtres' });
    await user.click(clearFilters);
    expect(isShown('Écharpe rouge')).toBe(true);
    expect(screen.getByLabelText('Rechercher')).toHaveValue('');
  });

  it('met une pièce en favori, puis ne garde que les favoris', async () => {
    const { user } = renderApp('/garde-robe', { wardrobe: [SCARF, TEE] });
    await user.click(screen.getByRole('button', { name: 'Ajouter Écharpe rouge aux favoris' }));
    expect(readStoredWardrobe()[0].piece.isFavorite).toBe(true);

    await user.click(screen.getByLabelText('Mes favoris seulement'));
    expect(isShown('Écharpe rouge')).toBe(true);
    expect(isShown('T-shirt bleu')).toBe(false);
  });

  it('affiche les tags sur la carte', () => {
    renderApp('/garde-robe', { wardrobe: [SCARF] });
    expect(screen.getByText('#noel', { selector: 'p' })).toBeInTheDocument();
  });
});
