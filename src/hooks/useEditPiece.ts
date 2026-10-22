import { useWardrobe } from '../contexts/wardrobe/useWardrobe';
import { mergeSavedProduct } from '../services/api/pieceMapper';
import { syncUpdatedPiece } from '../services/wardrobeSync';
import type { PieceFormValues, SavedPiece } from '../types/pieceForm';
import type { WardrobeItem } from '../types/wardrobe';
import { applyPieceFormValues, buildWardrobeItem } from '../utils/pieceFormValues';

export function useEditPiece(item: WardrobeItem): (values: PieceFormValues) => Promise<SavedPiece> {
  const { updateItem } = useWardrobe();

  return async (values) => {
    const editedPiece = applyPieceFormValues(item.piece, values);
    const updatedProduct = await syncUpdatedPiece(editedPiece);
    const savedPiece = updatedProduct
      ? mergeSavedProduct(editedPiece, updatedProduct)
      : editedPiece;
    updateItem(buildWardrobeItem(savedPiece, values));
    return { piece: savedPiece, apiProductId: updatedProduct?.id ?? null };
  };
}
