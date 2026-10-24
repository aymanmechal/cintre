import { screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { loadPhoto } from '../../../shared/photos/utils/photoStore';
import { cutoutPhoto } from '../../../shared/photos/utils/cutoutPhoto';
import { readStoredWardrobe, renderApp } from '../../../test/renderApp';
import { recognizePhoto } from '../api/recognizeApi';

const PHOTO = vi.hoisted(() => 'data:image/jpeg;base64,cGhvdG8=');
const CUTOUT = 'data:image/webp;base64,ZGV0b3Vy';

vi.mock('../../../shared/photos/utils/resizePhoto', () => ({ resizePhoto: async () => PHOTO }));
vi.mock('../../../shared/photos/utils/cutoutPhoto', () => ({ cutoutPhoto: vi.fn() }));
vi.mock('../api/recognizeApi', () => ({ recognizePhoto: vi.fn() }));

function photoFile(): File {
  return new File(['photo'], 'pull.jpg', { type: 'image/jpeg' });
}

function sidebar(): HTMLElement {
  return screen.getByRole('complementary', { name: 'Aperçu et résultat' });
}

async function addPhoto() {
  const rendered = renderApp('/ajouter');
  await rendered.user.upload(screen.getByTestId('piece-photo'), photoFile());
  await screen.findByRole('button', { name: /Remplir avec la photo/ });
  return rendered;
}

describe('Outils photo', () => {
  it('n’apparaissent qu’avec une photo', () => {
    renderApp('/ajouter');
    expect(screen.queryByRole('button', { name: /Détourer/ })).not.toBeInTheDocument();
  });

  it('remplissent le nom, le type et la couleur d’après la photo', async () => {
    vi.mocked(recognizePhoto).mockResolvedValue({
      title: 'Pull col roulé',
      pieceType: 'hauts',
      color: 'gris',
      season: 'hiver',
    });
    const { user } = await addPhoto();
    await user.click(screen.getByRole('button', { name: /Remplir avec la photo/ }));

    expect(await screen.findByText(/Champs remplis d’après la photo/)).toBeInTheDocument();
    expect(recognizePhoto).toHaveBeenCalledWith(PHOTO);
    expect(screen.getByLabelText(/^Nom/)).toHaveValue('Pull col roulé');
    expect(screen.getByLabelText('Type')).toHaveValue('hauts');
  });

  it('expliquent quand la reconnaissance échoue', async () => {
    vi.mocked(recognizePhoto).mockRejectedValue(new Error('hors ligne'));
    const { user } = await addPhoto();
    await user.click(screen.getByRole('button', { name: /Remplir avec la photo/ }));
    expect(await screen.findByText(/Je n’ai pas reconnu la pièce/)).toBeInTheDocument();
  });

  it('remplacent la photo par sa version détourée', async () => {
    vi.mocked(cutoutPhoto).mockResolvedValue(CUTOUT);
    const { user } = await addPhoto();
    await user.type(screen.getByLabelText(/^Nom/), 'Pull');
    await user.click(screen.getByRole('button', { name: /Détourer/ }));
    await waitFor(() => expect(cutoutPhoto).toHaveBeenCalledWith(PHOTO));
    await user.click(await screen.findByRole('button', { name: 'Ajouter la pièce' }));
    await within(sidebar()).findByText('Pièce ajoutée');

    const photoId = readStoredWardrobe()[0].piece.photoId;
    expect(photoId).not.toBeNull();
    expect(await loadPhoto(photoId ?? '')).toBe(CUTOUT);
  });
});
