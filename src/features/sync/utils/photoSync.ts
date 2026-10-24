import { reportPhotoSaved } from '../../../shared/photos/utils/photoChanges';
import { loadPhoto, savePhoto } from '../../../shared/photos/utils/photoStore';
import { downloadCloudPhoto, listCloudPhotoIds, uploadCloudPhoto } from '../api/photoCloudApi';

async function syncOnePhoto(userId: string, photoId: string, isInCloud: boolean): Promise<void> {
  const localPhoto = await loadPhoto(photoId);
  if (localPhoto !== undefined && !isInCloud) await uploadCloudPhoto(userId, photoId, localPhoto);
  if (localPhoto === undefined && isInCloud) {
    await savePhoto(photoId, await downloadCloudPhoto(userId, photoId));
    reportPhotoSaved();
  }
}

export async function syncPhotos(userId: string, photoIds: readonly string[]): Promise<void> {
  if (photoIds.length === 0) return;
  const cloudPhotoIds = new Set(await listCloudPhotoIds(userId));
  for (const photoId of new Set(photoIds)) {
    await syncOnePhoto(userId, photoId, cloudPhotoIds.has(photoId));
  }
}
