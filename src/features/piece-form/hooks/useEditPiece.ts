import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import type { Piece } from '../../../shared/pieces/types/piece';
import type { PieceFormValues } from '../types/pieceForm';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { applyPieceFormValues, buildWardrobeItem } from '../utils/pieceFormValues';

export function useEditPiece(item: WardrobeItem): (values: PieceFormValues) => Promise<Piece> {
  const { updateItem } = useWardrobe();

  return async (values) => {
    const editedPiece = applyPieceFormValues(item.piece, values);
    updateItem(buildWardrobeItem(editedPiece, values, item.lastWornOn));
    return editedPiece;
  };
}
