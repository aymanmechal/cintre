import { useWardrobe } from '../context/useWardrobe';
import type { WardrobeItem } from '../types/wardrobe';
import { findWardrobeItem } from '../utils/wardrobe';

function isWardrobeItem(item: WardrobeItem | undefined): item is WardrobeItem {
  return item !== undefined;
}

export function useWardrobeItems(pieceIds: readonly number[]): WardrobeItem[] {
  const { items } = useWardrobe();
  return pieceIds.map((pieceId) => findWardrobeItem(items, pieceId)).filter(isWardrobeItem);
}
