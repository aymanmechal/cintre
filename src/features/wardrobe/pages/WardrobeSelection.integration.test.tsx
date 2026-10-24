import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { readStoredWardrobe, renderApp } from '../../../test/renderApp';
import { Availability } from '../constants/wardrobe';

const WARDROBE = [
  makeWardrobeItem({ id: 1, title: 'Chemise lin', tags: ['ete'] }),
  makeWardrobeItem({ id: 2, title: 'Jean brut' }),
  makeWardrobeItem({ id: 3, title: 'Pull marin' }),
];

async function startSelecting() {
  const { user } = renderApp('/garde-robe', { wardrobe: WARDROBE });
  await user.click(screen.getByRole('button', { name: 'Sélectionner' }));
  return user;
}

describe('Garde-robe : sélection multiple', () => {
  it('affiche une case par pièce et le nombre de pièces choisies', async () => {
    const user = await startSelecting();
    expect(screen.getByText('Aucune pièce sélectionnée')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Sélectionner Chemise lin'));
    await user.click(screen.getByLabelText('Sélectionner Jean brut'));
    expect(screen.getByText('2 pièces sélectionnées')).toBeInTheDocument();
  });

  it('sélectionne et désélectionne tout', async () => {
    const user = await startSelecting();
    await user.click(screen.getByRole('button', { name: 'Tout sélectionner' }));
    expect(screen.getByText('3 pièces sélectionnées')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Tout désélectionner' }));
    expect(screen.getByText('Aucune pièce sélectionnée')).toBeInTheDocument();
  });

  it('met les pièces choisies en favoris, puis les retire', async () => {
    const user = await startSelecting();
    await user.click(screen.getByLabelText('Sélectionner Chemise lin'));
    await user.click(screen.getByLabelText('Sélectionner Jean brut'));
    await user.click(screen.getByRole('button', { name: 'Mettre en favoris' }));

    expect(readStoredWardrobe().map((item) => item.piece.isFavorite)).toEqual([true, true, false]);
    await user.click(screen.getByRole('button', { name: 'Retirer des favoris' }));
    expect(readStoredWardrobe().every((item) => !item.piece.isFavorite)).toBe(true);
  });

  it('change la disponibilité des pièces choisies', async () => {
    const user = await startSelecting();
    await user.click(screen.getByLabelText('Sélectionner Jean brut'));
    await user.click(screen.getByLabelText('Sélectionner Pull marin'));
    await user.selectOptions(screen.getByLabelText('Disponibilité'), Availability.Washing);

    expect(readStoredWardrobe().map((item) => item.availability)).toEqual([
      Availability.Available,
      Availability.Washing,
      Availability.Washing,
    ]);
  });

  it('ajoute des tags sans effacer ceux qui existent', async () => {
    const user = await startSelecting();
    await user.click(screen.getByRole('button', { name: 'Tout sélectionner' }));
    await user.type(screen.getByLabelText('Ajouter des tags'), 'soirée, vacances');
    await user.click(screen.getByRole('button', { name: 'Ajouter les tags' }));

    expect(readStoredWardrobe().map((item) => item.piece.tags)).toEqual([
      ['ete', 'soiree', 'vacances'],
      ['soiree', 'vacances'],
      ['soiree', 'vacances'],
    ]);
    expect(screen.getByLabelText('Ajouter des tags')).toHaveValue('');
  });

  it("ne montre les actions qu'une fois une pièce choisie", async () => {
    const user = await startSelecting();
    expect(screen.queryByRole('button', { name: 'Mettre en favoris' })).not.toBeInTheDocument();
    await user.click(screen.getByLabelText('Sélectionner Jean brut'));
    expect(screen.getByRole('button', { name: 'Mettre en favoris' })).toBeInTheDocument();
  });

  it('quitte le mode sélection en annulant', async () => {
    const user = await startSelecting();
    await user.click(screen.getByLabelText('Sélectionner Jean brut'));
    await user.click(screen.getByRole('button', { name: 'Annuler la sélection' }));

    expect(screen.queryByLabelText('Sélectionner Jean brut')).not.toBeInTheDocument();
    expect(screen.queryByText(/sélectionnée/)).not.toBeInTheDocument();
  });

  it('ne modifie que les pièces visibles après une recherche', async () => {
    const user = await startSelecting();
    await user.click(screen.getByRole('button', { name: 'Tout sélectionner' }));
    await user.type(screen.getByLabelText('Rechercher'), 'jean');

    expect(screen.getByText('1 pièce sélectionnée')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Mettre en favoris' }));
    expect(readStoredWardrobe().map((item) => item.piece.isFavorite)).toEqual([false, true, false]);
  });
});
