import { useEffect, useState, useSyncExternalStore } from 'react';
import { getPhotoVersion, subscribeToPhotoChanges } from '../utils/photoChanges';
import { loadPhoto } from '../utils/photoStore';

interface LoadedPhoto {
  photoId: string;
  url: string;
}

export function usePhotoUrl(photoId: string | null): string | null {
  const [loadedPhoto, setLoadedPhoto] = useState<LoadedPhoto | null>(null);
  const photoVersion = useSyncExternalStore(subscribeToPhotoChanges, getPhotoVersion);

  useEffect(() => {
    if (photoId === null) return;
    let isCancelled = false;
    void loadPhoto(photoId).then((url) => {
      if (!isCancelled && url !== undefined) setLoadedPhoto({ photoId, url });
    });
    return () => {
      isCancelled = true;
    };
  }, [photoId, photoVersion]);

  return loadedPhoto?.photoId === photoId ? loadedPhoto.url : null;
}
