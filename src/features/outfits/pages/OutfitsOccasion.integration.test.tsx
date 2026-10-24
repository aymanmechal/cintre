import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { readStoredOutfits, renderApp } from '../../../test/renderApp';
import { Occasion } from '../constants/occasions';

const WARDROBE = [
  makeWardrobeItem({ id: 1, title: 'Chemise lin' }),
  makeWardrobeItem({ id: 2, title: 'Jean brut', pieceType: PieceType.Bottoms }),
];
const OUTFITS = [
  makeOutfit({ id: 'a', name: 'Bureau', pieceIds: [1, 2], occasion: Occasion.Work }),
  makeOutfit({ id: 'b', name: 'Fête', pieceIds: [1, 2], occasion: Occasion.Party }),
  makeOutfit({ id: 'c', name: 'Sans occasion', pieceIds: [1, 2] }),
];

function outfitNames(): string[] {
  const list = screen.getByRole('region', { name: /^Mes tenues/ });
  return within(list)
    .getAllByRole('heading', { level: 3 })
    .map((heading) => heading.textContent ?? '');
}

describe('Tenues : occasion', () => {
  it('filtre la liste par occasion', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE, outfits: OUTFITS });
    expect(outfitNames()).toHaveLength(3);

    await user.selectOptions(screen.getByLabelText('Occasion'), Occasion.Party);
    expect(outfitNames()).toEqual(['Fête']);

    await user.selectOptions(screen.getByLabelText('Occasion'), 'toutes');
    expect(outfitNames()).toHaveLength(3);
  });

  it('prévient quand aucune tenue ne correspond à l’occasion', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE, outfits: OUTFITS });
    await user.selectOptions(screen.getByLabelText('Occasion'), Occasion.Wedding);
    expect(screen.getByText('Aucune tenue ne correspond à cette occasion.')).toBeInTheDocument();
  });

  it('combine la recherche et l’occasion', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE, outfits: OUTFITS });
    await user.type(screen.getByLabelText('Rechercher une tenue'), 'bureau');
    await user.selectOptions(screen.getByLabelText('Occasion'), Occasion.Party);
    expect(screen.getByText('Aucune tenue ne correspond à « bureau ».')).toBeInTheDocument();
  });

  it('change l’occasion d’une tenue enregistrée', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE, outfits: OUTFITS });
    await user.selectOptions(screen.getByLabelText('Occasion de Sans occasion'), Occasion.Date);

    expect(readStoredOutfits().find((outfit) => outfit.id === 'c')?.occasion).toBe(Occasion.Date);
    await user.selectOptions(screen.getByLabelText('Occasion de Sans occasion'), '');
    expect(readStoredOutfits().find((outfit) => outfit.id === 'c')?.occasion).toBeNull();
  });

  it('choisit l’occasion en créant une tenue', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE });
    const shelf = screen.getByRole('region', { name: 'Choisis ton haut' });
    await user.click(within(shelf).getByRole('button', { name: /Chemise lin/ }));
    await user.click(
      within(screen.getByRole('region', { name: 'Choisis ton bas' })).getByRole('button', {
        name: /Jean brut/,
      }),
    );
    await user.selectOptions(screen.getByLabelText('Occasion (facultatif)'), Occasion.Interview);
    await user.click(screen.getByRole('button', { name: 'Créer la tenue' }));

    expect(readStoredOutfits()).toMatchObject([{ occasion: Occasion.Interview }]);
    expect(screen.getByLabelText('Occasion (facultatif)')).toHaveValue('');
  });

  it('duplique une tenue avec son occasion', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE, outfits: [OUTFITS[0]] });
    await user.click(screen.getByRole('button', { name: 'Dupliquer la tenue Bureau' }));
    expect(readStoredOutfits().map((outfit) => outfit.occasion)).toEqual([
      Occasion.Work,
      Occasion.Work,
    ]);
  });
});
