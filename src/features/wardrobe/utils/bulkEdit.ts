import { parseTags } from '../../../shared/pieces/utils/tags';
import type { Availability } from '../constants/wardrobe';
import type { WardrobeItem } from '../types/wardrobe';

export function withAvailability(item: WardrobeItem, availability: Availability): WardrobeItem {
  return { ...item, availability };
}

export function withFavorite(item: WardrobeItem, isFavorite: boolean): WardrobeItem {
  return { ...item, piece: { ...item.piece, isFavorite } };
}

export function withTags(item: WardrobeItem, tagsText: string): WardrobeItem {
  const tags = [...new Set([...item.piece.tags, ...parseTags(tagsText)])];
  return { ...item, piece: { ...item.piece, tags } };
}

export function areAllFavorites(items: readonly WardrobeItem[]): boolean {
  return items.length > 0 && items.every((item) => item.piece.isFavorite);
}

export function selectItemsByIds(
  items: readonly WardrobeItem[],
  selectedIds: readonly number[],
): WardrobeItem[] {
  return items.filter((item) => selectedIds.includes(item.piece.id));
}

export function toggleId(ids: readonly number[], id: number): number[] {
  return ids.includes(id) ? ids.filter((current) => current !== id) : [...ids, id];
}

export function formatSelectionCount(count: number): string {
  if (count === 0) return 'Aucune pièce sélectionnée';
  return `${count} pièce${count > 1 ? 's' : ''} sélectionnée${count > 1 ? 's' : ''}`;
}
