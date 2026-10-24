import type { Piece } from '../types/piece';

export function collectPiecePhotoIds(piece: Piece): string[] {
  return piece.photoId ? [piece.photoId, ...piece.extraPhotoIds] : piece.extraPhotoIds;
}
