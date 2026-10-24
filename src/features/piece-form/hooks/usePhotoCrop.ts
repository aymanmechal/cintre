import { useState } from 'react';
import { CROP_MAX_MARGIN, NO_CROP } from '../../../shared/photos/constants/crop';
import type { CropMargins } from '../../../shared/photos/types/cropMargins';
import { cropPhoto } from '../../../shared/photos/utils/cropPhoto';
import { fetchRemoteImage } from '../../../shared/photos/utils/fetchRemoteImage';
import { createPhotoId, loadPhoto, savePhoto } from '../../../shared/photos/utils/photoStore';
import { resizePhoto } from '../../../shared/photos/utils/resizePhoto';
import { PhotoCropStatus } from '../constants/photoCrop';

interface PhotoCropOptions {
  photoId: string | null;
  imageUrl: string;
  onCropped: (photoId: string) => void;
}

export interface PhotoCropState {
  status: PhotoCropStatus;
  source: string | null;
  margins: CropMargins;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  changeMargin: (side: keyof CropMargins, value: number) => void;
  apply: () => void;
}

async function loadSource({ photoId, imageUrl }: PhotoCropOptions): Promise<string> {
  const stored = photoId ? await loadPhoto(photoId) : undefined;
  return stored ?? resizePhoto(await fetchRemoteImage(imageUrl));
}

export function usePhotoCrop(options: PhotoCropOptions): PhotoCropState {
  const [status, setStatus] = useState(PhotoCropStatus.Closed);
  const [source, setSource] = useState<string | null>(null);
  const [margins, setMargins] = useState(NO_CROP);

  function open() {
    setMargins(NO_CROP);
    setStatus(PhotoCropStatus.Loading);
    loadSource(options)
      .then((loaded) => {
        setSource(loaded);
        setStatus(PhotoCropStatus.Editing);
      })
      .catch(() => setStatus(PhotoCropStatus.Failed));
  }

  function close() {
    setSource(null);
    setStatus(PhotoCropStatus.Closed);
  }

  function changeMargin(side: keyof CropMargins, value: number) {
    setMargins((current) => ({ ...current, [side]: Math.min(value, CROP_MAX_MARGIN) }));
  }

  async function saveCrop(photo: string) {
    const croppedId = createPhotoId();
    await savePhoto(croppedId, await cropPhoto(photo, margins));
    options.onCropped(croppedId);
    close();
  }

  function apply() {
    if (source === null) return;
    setStatus(PhotoCropStatus.Saving);
    saveCrop(source).catch(() => setStatus(PhotoCropStatus.Failed));
  }

  return {
    status,
    source,
    margins,
    isOpen: status !== PhotoCropStatus.Closed,
    open,
    close,
    changeMargin,
    apply,
  };
}
