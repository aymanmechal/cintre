import { screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { listPhotoIds, savePhoto } from '../../../shared/photos/utils/photoStore';
import { makeWardrobeItem } from '../../../test/factories';
import { readStoredWardrobe, renderApp } from '../../../test/renderApp';

const PHOTO = vi.hoisted(() => 'data:image/jpeg;base64,cGhvdG8=');

vi.mock('../../../shared/photos/utils/resizePhoto', () => ({
  resizePhoto: async () => PHOTO,
}));

function sidebar(): HTMLElement {
  return screen.getByRole('complementary', { name: 'Aperçu et résultat' });
}

function photoFile(): File {
  return new File(['photo'], 'pull.jpg', { type: 'image/jpeg' });
}

describe('Plusieurs photos par pièce', () => {
  it('enregistre des photos supplémentaires puis en retire une', async () => {
    const { user } = renderApp('/ajouter');
    await user.type(screen.getByLabelText(/^Nom/), 'Pull marin');
    await user.click(screen.getByText('Plus de détails (facultatif)'));
    await user.upload(screen.getByTestId('piece-extra-photo'), photoFile());
    await screen.findByRole('button', { name: 'Retirer la photo 1' });
    await user.upload(screen.getByTestId('piece-extra-photo'), photoFile());
    await user.click(await screen.findByRole('button', { name: 'Retirer la photo 1' }));

    expect(screen.getByText('Autres photos (1/3)')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Ajouter la pièce' }));
    await within(sidebar()).findByText('Pièce ajoutée');
    expect(readStoredWardrobe()[0].piece.extraPhotoIds).toEqual([expect.any(String)]);
  });

  it('met une photo supplémentaire en photo principale', async () => {
    const item = makeWardrobeItem({ id: 4, photoId: 'main', extraPhotoIds: ['extra'] });
    await savePhoto('main', PHOTO);
    await savePhoto('extra', PHOTO);
    const { user } = renderApp('/garde-robe/4/modifier', { wardrobe: [item] });
    await user.click(screen.getByText('Plus de détails (facultatif)'));
    await user.click(screen.getByRole('button', { name: 'Mettre la photo 1 en principale' }));
    await user.click(screen.getByRole('button', { name: 'Enregistrer' }));

    await within(sidebar()).findByText('Modifications enregistrées');
    expect(readStoredWardrobe()[0].piece).toMatchObject({
      photoId: 'extra',
      extraPhotoIds: ['main'],
    });
  });

  it('supprime au démarrage les photos qui ne servent plus', async () => {
    const item = makeWardrobeItem({ id: 5, photoId: 'gardee' });
    await savePhoto('gardee', PHOTO);
    await savePhoto('oubliee', PHOTO);
    renderApp('/garde-robe', { wardrobe: [item] });

    await waitFor(async () => expect(await listPhotoIds()).not.toContain('oubliee'));
    expect(await listPhotoIds()).toContain('gardee');
  });
});
