import type { Piece } from '../../../shared/pieces/types/piece';
import { isCatalogPiece } from '../../../shared/pieces/utils/pieceOrigin';
import type { ApiSavedProduct } from '../../../shared/pieces/api/dummyJsonTypes';
import { deletePiece, updatePiece } from '../../../shared/pieces/api/piecesApi';

export async function syncUpdatedPiece(piece: Piece): Promise<ApiSavedProduct | null> {
  return isCatalogPiece(piece.id) ? updatePiece(piece) : null;
}

export async function syncDeletedPiece(piece: Piece): Promise<void> {
  if (isCatalogPiece(piece.id)) {
    await deletePiece(piece.id);
  }
}
