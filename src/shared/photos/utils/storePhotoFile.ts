import { createPhotoId, savePhoto } from './photoStore';
import { resizePhoto } from './resizePhoto';

export async function storePhotoFile(file: Blob): Promise<string> {
  const photoId = createPhotoId();
  await savePhoto(photoId, await resizePhoto(file));
  return photoId;
}
