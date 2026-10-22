import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { mergeSavedProduct } from '../../../shared/pieces/api/pieceMapper';
import { syncUpdatedPiece } from '../api/wardrobeSync';
import type { PieceFormValues, SavedPiece } from '../types/pieceForm';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { applyPieceFormValues, buildWardrobeItem } from '../utils/pieceFormValues';

export function useEditPiece(item: WardrobeItem): (values: PieceFormValues) => Promise<SavedPiece> {
  const { updateItem } = useWardrobe();

  return async (values) => {
    const editedPiece = applyPieceFormValues(item.piece, values);
    const updatedProduct = await syncUpdatedPiece(editedPiece);
    const savedPiece = updatedProduct
      ? mergeSavedProduct(editedPiece, updatedProduct)
      : editedPiece;
    updateItem(buildWardrobeItem(savedPiece, values, item.lastWornOn));
    return { piece: savedPiece, apiProductId: updatedProduct?.id ?? null };
  };
}
