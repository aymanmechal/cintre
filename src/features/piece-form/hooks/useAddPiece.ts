import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { mergeSavedProduct } from '../../../shared/pieces/api/pieceMapper';
import { createPiece } from '../../../shared/pieces/api/piecesApi';
import type { PieceFormValues, SavedPiece } from '../types/pieceForm';
import { buildCustomPiece } from '../utils/customPiece';
import { buildWardrobeItem } from '../utils/pieceFormValues';

export function useAddPiece(): (values: PieceFormValues) => Promise<SavedPiece> {
  const { addItem } = useWardrobe();

  return async (values) => {
    const piece = buildCustomPiece(values);
    const createdProduct = await createPiece(piece);
    const savedPiece = mergeSavedProduct(piece, createdProduct);
    addItem(buildWardrobeItem(savedPiece, values));
    return { piece: savedPiece, apiProductId: createdProduct.id };
  };
}
