import { describe, expect, it } from 'vitest';
import { createPhotoId, deletePhoto, listPhotoIds, loadPhoto, savePhoto } from './photoStore';

const PHOTO = 'data:image/jpeg;base64,cGhvdG8=';

describe('photoStore', () => {
  it('relit une photo enregistrée', async () => {
    const photoId = createPhotoId();
    await savePhoto(photoId, PHOTO);
    expect(await loadPhoto(photoId)).toBe(PHOTO);
  });

  it("renvoie undefined pour une photo qui n'existe pas", async () => {
    expect(await loadPhoto('inconnue')).toBeUndefined();
  });

  it('liste les photos enregistrées', async () => {
    const photoId = createPhotoId();
    await savePhoto(photoId, PHOTO);
    expect(await listPhotoIds()).toContain(photoId);
  });

  it('supprime une photo', async () => {
    const photoId = createPhotoId();
    await savePhoto(photoId, PHOTO);
    await deletePhoto(photoId);
    expect(await loadPhoto(photoId)).toBeUndefined();
  });
});
