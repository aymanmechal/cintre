import { useWardrobe } from '../contexts/wardrobe/useWardrobe';
import type { WardrobeItem } from '../types/wardrobe';
import { findWardrobeItem } from '../utils/wardrobe';

export function useWardrobeItem(pieceId: number | null): WardrobeItem | undefined {
  const { items } = useWardrobe();
  return pieceId === null ? undefined : findWardrobeItem(items, pieceId);
}
