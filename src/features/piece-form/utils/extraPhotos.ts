import { MAX_EXTRA_PHOTOS } from '../../../shared/pieces/constants/photos';

export interface PiecePhotos {
  photoId: string | null;
  extraPhotoIds: string[];
}

export function canAddExtraPhoto(extraPhotoIds: readonly string[]): boolean {
  return extraPhotoIds.length < MAX_EXTRA_PHOTOS;
}

export function addExtraPhoto(extraPhotoIds: readonly string[], photoId: string): string[] {
  return canAddExtraPhoto(extraPhotoIds) ? [...extraPhotoIds, photoId] : [...extraPhotoIds];
}

export function removeExtraPhoto(extraPhotoIds: readonly string[], photoId: string): string[] {
  return extraPhotoIds.filter((extraPhotoId) => extraPhotoId !== photoId);
}

export function promoteExtraPhoto(photos: PiecePhotos, photoId: string): PiecePhotos {
  const otherPhotoIds = removeExtraPhoto(photos.extraPhotoIds, photoId);
  return {
    photoId,
    extraPhotoIds: photos.photoId ? [photos.photoId, ...otherPhotoIds] : otherPhotoIds,
  };
}
