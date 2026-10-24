import { loadPhoto, savePhoto } from '../../../shared/photos/utils/photoStore';
import type { PhotoDataUrls } from '../types/backup';

export async function readPhotos(photoIds: readonly string[]): Promise<PhotoDataUrls> {
  const photos: PhotoDataUrls = {};
  for (const photoId of photoIds) {
    const photo = await loadPhoto(photoId);
    if (photo !== undefined) photos[photoId] = photo;
  }
  return photos;
}

export async function writePhotos(photos: PhotoDataUrls): Promise<void> {
  for (const [photoId, photo] of Object.entries(photos)) await savePhoto(photoId, photo);
}
