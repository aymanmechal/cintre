import type { Piece } from '../types/piece';
import { isCatalogPiece } from '../utils/customPiece';
import type { ApiSavedProduct } from './api/dummyJsonTypes';
import { deletePiece, updatePiece } from './api/piecesApi';

export async function syncUpdatedPiece(piece: Piece): Promise<ApiSavedProduct | null> {
  return isCatalogPiece(piece.id) ? updatePiece(piece) : null;
}

export async function syncDeletedPiece(piece: Piece): Promise<void> {
  if (isCatalogPiece(piece.id)) {
    await deletePiece(piece.id);
  }
}
