import { collectPiecePhotoIds } from '../../../shared/pieces/utils/piecePhotos';
import type { ArchivedItem, TrashedItem, WardrobeItem } from '../types/wardrobe';

export function collectWardrobePhotoIds(
  items: readonly WardrobeItem[],
  trash: readonly TrashedItem[],
  archive: readonly ArchivedItem[],
): string[] {
  const storedItems = [...trash, ...archive].map(({ item }) => item);
  return [...items, ...storedItems].flatMap(({ piece }) => collectPiecePhotoIds(piece));
}

export function findOrphanPhotoIds(
  storedPhotoIds: readonly string[],
  usedPhotoIds: readonly string[],
): string[] {
  const used = new Set(usedPhotoIds);
  return storedPhotoIds.filter((photoId) => !used.has(photoId));
}
