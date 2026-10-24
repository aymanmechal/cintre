import { useEffect, useState } from 'react';
import { deletePhoto, listPhotoIds } from '../../../shared/photos/utils/photoStore';
import { useWardrobe } from '../context/useWardrobe';
import { collectWardrobePhotoIds, findOrphanPhotoIds } from '../utils/wardrobePhotos';

async function purgeOrphanPhotos(usedPhotoIds: readonly string[]) {
  const orphanPhotoIds = findOrphanPhotoIds(await listPhotoIds(), usedPhotoIds);
  for (const photoId of orphanPhotoIds) await deletePhoto(photoId);
}

export function usePurgeOrphanPhotos(): void {
  const { items, trash, archive } = useWardrobe();
  const [usedPhotoIdsAtStartup] = useState(() => collectWardrobePhotoIds(items, trash, archive));

  useEffect(() => {
    void purgeOrphanPhotos(usedPhotoIdsAtStartup).catch(() => undefined);
  }, [usedPhotoIdsAtStartup]);
}
