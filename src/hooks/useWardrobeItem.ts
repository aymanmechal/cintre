import { useWardrobe } from '../contexts/wardrobe/useWardrobe';
import type { WardrobeItem } from '../types/wardrobe';
import { findWardrobeItem } from '../utils/wardrobe';

export function useWardrobeItem(pieceId: number): WardrobeItem | undefined {
  const { items } = useWardrobe();
  return findWardrobeItem(items, pieceId);
}
