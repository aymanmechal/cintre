import { useState } from 'react';
import { cutoutPhoto } from '../../../shared/photos/utils/cutoutPhoto';
import { createPhotoId, loadPhoto, savePhoto } from '../../../shared/photos/utils/photoStore';
import { recognizePhoto } from '../api/recognizeApi';
import { BUSY_PHOTO_TOOL_STATUSES, PhotoToolStatus } from '../constants/photoTools';
import type { PhotoRecognition } from '../types/photoRecognition';
import { parsePhotoRecognition } from '../utils/photoRecognition';

interface PhotoToolsOptions {
  photoId: string;
  onPhotoChange: (photoId: string) => void;
  onRecognized: (recognition: PhotoRecognition) => void;
}

export interface PhotoToolsState {
  status: PhotoToolStatus;
  isBusy: boolean;
  cutout: () => void;
  recognize: () => void;
}

async function readPhoto(photoId: string): Promise<string> {
  const photo = await loadPhoto(photoId);
  if (photo === undefined) throw new Error('Photo introuvable');
  return photo;
}

export function usePhotoTools({
  photoId,
  onPhotoChange,
  onRecognized,
}: PhotoToolsOptions): PhotoToolsState {
  const [status, setStatus] = useState(PhotoToolStatus.Idle);

  async function runCutout() {
    const cutoutId = createPhotoId();
    await savePhoto(cutoutId, await cutoutPhoto(await readPhoto(photoId)));
    onPhotoChange(cutoutId);
    setStatus(PhotoToolStatus.Idle);
  }

  async function runRecognition() {
    const recognition = parsePhotoRecognition(await recognizePhoto(await readPhoto(photoId)));
    if (!recognition) throw new Error('Rien reconnu');
    onRecognized(recognition);
    setStatus(PhotoToolStatus.Recognized);
  }

  function run(task: () => Promise<void>, busy: PhotoToolStatus, failed: PhotoToolStatus) {
    setStatus(busy);
    void task().catch(() => setStatus(failed));
  }

  return {
    status,
    isBusy: BUSY_PHOTO_TOOL_STATUSES.includes(status),
    cutout: () => run(runCutout, PhotoToolStatus.CuttingOut, PhotoToolStatus.CutoutFailed),
    recognize: () =>
      run(runRecognition, PhotoToolStatus.Recognizing, PhotoToolStatus.RecognitionFailed),
  };
}
