import { useState, type ChangeEvent } from 'react';
import { storePhotoFile } from '../../../shared/photos/utils/storePhotoFile';

export enum PhotoPickerStatus {
  Idle = 'idle',
  Processing = 'processing',
  Error = 'error',
}

export interface PhotoPickerState {
  status: PhotoPickerStatus;
  pickPhoto: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function usePhotoPicker(onPhotoStored: (photoId: string) => void): PhotoPickerState {
  const [status, setStatus] = useState(PhotoPickerStatus.Idle);

  async function storePhoto(file: File) {
    setStatus(PhotoPickerStatus.Processing);
    try {
      onPhotoStored(await storePhotoFile(file));
      setStatus(PhotoPickerStatus.Idle);
    } catch {
      setStatus(PhotoPickerStatus.Error);
    }
  }

  function pickPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) void storePhoto(file);
  }

  return { status, pickPhoto };
}
