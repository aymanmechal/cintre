import { screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { readStoredOutfits, readStoredWardrobe, renderApp } from '../../../test/renderApp';
import { loadPhoto } from '../../../shared/photos/utils/photoStore';
import { buildBackup } from '../utils/backup';

const PHOTO = 'data:image/jpeg;base64,cGhvdG8=';
const IMPORTED = makeWardrobeItem({ id: 3, title: 'Pull importé', photoId: 'photo-3' });

function backupFile(text: string): File {
  return new File([text], 'sauvegarde.json', { type: 'application/json' });
}

const VALID_BACKUP = JSON.stringify(
  buildBackup(
    {
      wardrobe: [IMPORTED],
      trash: [],
      archive: [],
      outfits: [makeOutfit({ pieceIds: [3] })],
      wornLog: [],
      photos: { 'photo-3': PHOTO },
    },
    '2025-03-10',
  ),
);

describe('Sauvegarde', () => {
  it('est accessible depuis le pied de page', async () => {
    const { user } = renderApp('/');
    await user.click(screen.getByRole('link', { name: /Sauvegarder mes données/ }));
    expect(screen.getByRole('heading', { name: 'Sauvegarde', level: 1 })).toBeInTheDocument();
  });

  it('restaure une sauvegarde après confirmation, photos comprises', async () => {
    const { user } = renderApp('/sauvegarde', { wardrobe: [makeWardrobeItem({ id: 1 })] });
    await user.upload(screen.getByTestId('backup-file'), backupFile(VALID_BACKUP));
    await user.click(
      within(await screen.findByRole('dialog')).getByRole('button', { name: 'Restaurer' }),
    );

    expect(await screen.findByText(/Sauvegarde restaurée/)).toBeInTheDocument();
    await waitFor(() => expect(readStoredWardrobe()).toEqual([IMPORTED]));
    expect(readStoredOutfits()).toHaveLength(1);
    expect(await loadPhoto('photo-3')).toBe(PHOTO);
  });

  it('ne touche à rien si on annule', async () => {
    const original = makeWardrobeItem({ id: 1 });
    const { user } = renderApp('/sauvegarde', { wardrobe: [original] });
    await user.upload(screen.getByTestId('backup-file'), backupFile(VALID_BACKUP));
    await user.click(
      within(await screen.findByRole('dialog')).getByRole('button', { name: 'Annuler' }),
    );
    expect(readStoredWardrobe()).toEqual([original]);
  });

  it('refuse un fichier qui n’est pas une sauvegarde', async () => {
    const { user } = renderApp('/sauvegarde');
    await user.upload(screen.getByTestId('backup-file'), backupFile('{"n":1}'));
    expect(await screen.findByRole('alert')).toHaveTextContent(/pas une sauvegarde/);
  });
});
