import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { readStoredWardrobe, renderApp } from '../../../test/renderApp';

const SHARED_ROUTE =
  '/ajouter?title=Pantalon%20large&url=https%3A%2F%2Fwww.zara.com%2Ffr%2Ffr%2Fpantalon-p01.html';

function sidebar(): HTMLElement {
  return screen.getByRole('complementary', { name: 'Aperçu et résultat' });
}

describe('Partager un article vers Cintré', () => {
  it('préremplit une envie avec le nom, la marque et le lien', async () => {
    const { user } = renderApp(SHARED_ROUTE);
    expect(screen.getByText(/Article reçu/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Nom/)).toHaveValue('Pantalon large');

    await user.click(screen.getByRole('button', { name: 'Ajouter la pièce' }));
    await within(sidebar()).findByText('Pièce ajoutée');

    expect(readStoredWardrobe()[0]).toMatchObject({
      status: 'wanted',
      piece: {
        title: 'Pantalon large',
        brand: 'Zara',
        productUrl: 'https://www.zara.com/fr/fr/pantalon-p01.html',
      },
    });
    expect(screen.getByLabelText(/^Nom/)).toHaveValue('');
  });

  it('garde le formulaire normal sans partage', () => {
    renderApp('/ajouter');
    expect(screen.queryByText(/Article reçu/)).not.toBeInTheDocument();
  });
});
