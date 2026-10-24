import { PIECE_TYPE_LABELS } from '../../../shared/pieces/constants/categories';
import { PIECE_COLOR_LABELS } from '../../../shared/pieces/constants/colors';
import { SEASON_LABELS } from '../../../shared/pieces/constants/seasons';
import { isWearable } from '../../outfits/utils/combinations';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import type { StylistPiece } from '../types/stylist';

function toStylistPiece({ piece }: WardrobeItem): StylistPiece {
  return {
    id: piece.id,
    name: piece.title,
    type: PIECE_TYPE_LABELS[piece.pieceType],
    color: piece.color ? PIECE_COLOR_LABELS[piece.color] : null,
    season: piece.season ? SEASON_LABELS[piece.season] : null,
    brand: piece.brand,
    tags: piece.tags,
  };
}

export function toStylistPieces(items: readonly WardrobeItem[]): StylistPiece[] {
  return items.filter(isWearable).map(toStylistPiece);
}
