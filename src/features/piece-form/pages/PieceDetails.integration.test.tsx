import { screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { readStoredWardrobe, renderApp } from '../../../test/renderApp';

const PHOTO = vi.hoisted(() => 'data:image/jpeg;base64,cGhvdG8=');

vi.mock('../../../shared/photos/utils/resizePhoto', () => ({
  resizePhoto: async () => PHOTO,
}));

function sidebar(): HTMLElement {
  return screen.getByRole('complementary', { name: 'Aperçu et résultat' });
}

describe('Ajouter une pièce : détails et photo', () => {
  it('enregistre la couleur, la saison, la taille et la date d’achat', async () => {
    const { user } = renderApp('/ajouter');
    await user.type(screen.getByLabelText(/^Nom/), 'Pull marin');
    await user.click(screen.getByRole('button', { name: 'Bleu' }));
    await user.click(screen.getByText('Plus de détails (facultatif)'));
    await user.selectOptions(screen.getByLabelText('Saison'), 'hiver');
    await user.type(screen.getByLabelText('Taille'), 'M');
    await user.type(screen.getByLabelText('Date d’achat'), '2025-11-02');
    await user.click(screen.getByRole('button', { name: 'Ajouter la pièce' }));

    await within(sidebar()).findByText('Pièce ajoutée');
    expect(readStoredWardrobe()[0].piece).toMatchObject({
      color: 'bleu',
      season: 'hiver',
      size: 'M',
      boughtOn: '2025-11-02',
    });
  });

  it('enregistre une photo prise ou choisie sur le téléphone', async () => {
    const { user } = renderApp('/ajouter');
    await user.type(screen.getByLabelText(/^Nom/), 'Pull marin');
    const photo = new File(['photo'], 'pull.jpg', { type: 'image/jpeg' });
    await user.upload(screen.getByTestId('piece-photo'), photo);

    expect(await screen.findByRole('button', { name: 'Retirer la photo' })).toBeInTheDocument();
    await waitFor(() => expect(sidebar().querySelector('img')).toHaveAttribute('src', PHOTO));
    await user.click(screen.getByRole('button', { name: 'Ajouter la pièce' }));
    await within(sidebar()).findByText('Pièce ajoutée');
    expect(readStoredWardrobe()[0].piece.photoId).toEqual(expect.any(String));
  });
});
