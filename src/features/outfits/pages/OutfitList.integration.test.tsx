import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { openMyOutfitsTab } from '../../../test/outfitsNavigation';
import { renderApp } from '../../../test/renderApp';

const WARDROBE = [
  makeWardrobeItem({ id: 1, title: 'Jean droit' }),
  makeWardrobeItem({ id: 2, title: 'Pull marin' }),
];
const OUTFITS = Array.from({ length: 6 }, (_, index) =>
  makeOutfit({ id: `o${index + 1}`, name: `Tenue ${index + 1}`, pieceIds: [1, 2] }),
);

function outfitNames(): string[] {
  const list = screen.getByRole('region', { name: /^Mes tenues/ });
  return within(list)
    .getAllByRole('heading', { level: 3 })
    .map((heading) => heading.textContent ?? '');
}

describe('Tenues : liste', () => {
  it('montre 4 tenues par page, la plus récente en premier', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE, outfits: OUTFITS });
    await openMyOutfitsTab(user);
    expect(outfitNames()).toEqual(['Tenue 6', 'Tenue 5', 'Tenue 4', 'Tenue 3']);
    expect(screen.getByText('Page 1 sur 2')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Suivant →' }));
    expect(outfitNames()).toEqual(['Tenue 2', 'Tenue 1']);
    expect(screen.getByRole('button', { name: 'Suivant →' })).toBeDisabled();
  });

  it('cherche une tenue et revient à la première page', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE, outfits: OUTFITS });
    await openMyOutfitsTab(user);
    await user.click(screen.getByRole('button', { name: 'Suivant →' }));
    await user.type(screen.getByLabelText('Rechercher une tenue'), 'tenue 2');

    expect(outfitNames()).toEqual(['Tenue 2']);
    expect(screen.queryByRole('navigation', { name: 'Pagination' })).not.toBeInTheDocument();
  });

  it('prévient quand aucune tenue ne correspond', async () => {
    const { user } = renderApp('/tenues', { wardrobe: WARDROBE, outfits: OUTFITS });
    await openMyOutfitsTab(user);
    await user.type(screen.getByLabelText('Rechercher une tenue'), 'manteau');
    expect(screen.getByText('Aucune tenue ne correspond à « manteau ».')).toBeInTheDocument();
  });
});
