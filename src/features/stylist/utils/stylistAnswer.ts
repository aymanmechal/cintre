import { isRecord } from '../../../shared/utils/isRecord';
import { isWearable, toIdea } from '../../outfits/utils/combinations';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import type { StylistAnswer, StylistSuggestion } from '../types/stylist';

export function parseStylistAnswer(value: unknown): StylistAnswer | null {
  if (!isRecord(value) || !Array.isArray(value.pieceIds)) return null;
  return {
    pieceIds: value.pieceIds.filter((id): id is number => Number.isInteger(id)),
    explanation: typeof value.explanation === 'string' ? value.explanation.trim() : '',
  };
}

export function toStylistSuggestion(
  answer: StylistAnswer,
  items: readonly WardrobeItem[],
): StylistSuggestion | null {
  const chosenIds = new Set(answer.pieceIds);
  const chosenItems = items.filter((item) => isWearable(item) && chosenIds.has(item.piece.id));
  if (chosenItems.length === 0) return null;
  return { idea: toIdea(chosenItems), explanation: answer.explanation };
}
