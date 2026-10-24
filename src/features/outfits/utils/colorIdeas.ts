import { IDEA_SLOTS, OUTFIT_SLOT_BY_PIECE_TYPE } from '../constants/outfits';
import type { Outfit, OutfitIdea } from '../types/outfit';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { PIECE_COLORS, type PieceColor } from '../../../shared/pieces/constants/colors';
import { buildOutfitIdeas, isWearable } from './combinations';
import { EMPTY_TASTES } from '../constants/tastes';
import type { Tastes } from '../types/tastes';

function isIdeaAnchor(item: WardrobeItem): boolean {
  return IDEA_SLOTS.includes(OUTFIT_SLOT_BY_PIECE_TYPE[item.piece.pieceType]);
}

export function listWearableColors(items: readonly WardrobeItem[]): PieceColor[] {
  const wearableColors = new Set(items.filter(isWearable).map((item) => item.piece.color));
  return PIECE_COLORS.filter((color) => wearableColors.has(color));
}

export function buildColorIdeas(
  color: PieceColor,
  items: readonly WardrobeItem[],
  outfits: readonly Outfit[],
  tastes: Tastes = EMPTY_TASTES,
): OutfitIdea[] {
  const anchors = items.filter(
    (item) => isWearable(item) && isIdeaAnchor(item) && item.piece.color === color,
  );
  const ideas = anchors.flatMap((anchor) => buildOutfitIdeas([anchor], items, outfits, tastes));
  return [...new Map(ideas.map((idea) => [idea.key, idea])).values()];
}
