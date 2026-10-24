import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import type { Piece } from '../../../shared/pieces/types/piece';
import type { PieceFormValues } from '../types/pieceForm';
import { buildCustomPiece } from '../utils/customPiece';
import { buildWardrobeItem } from '../utils/pieceFormValues';

export function useAddPiece(): (values: PieceFormValues) => Promise<Piece> {
  const { addItem } = useWardrobe();

  return async (values) => {
    const piece = buildCustomPiece(values);
    addItem(buildWardrobeItem(piece, values));
    return piece;
  };
}
