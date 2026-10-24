import { useState } from 'react';
import type { Availability } from '../constants/wardrobe';
import { useWardrobe } from '../context/useWardrobe';
import type { WardrobeItem } from '../types/wardrobe';
import {
  areAllFavorites,
  selectItemsByIds,
  toggleId,
  withAvailability,
  withFavorite,
  withTags,
} from '../utils/bulkEdit';

export interface WardrobeSelection {
  isSelecting: boolean;
  selectedCount: number;
  allAreFavorites: boolean;
  isSelected: (pieceId: number) => boolean;
  toggleSelecting: () => void;
  toggleItem: (pieceId: number) => void;
  selectAll: () => void;
  clearSelection: () => void;
  applyAvailability: (availability: Availability) => void;
  applyFavorite: () => void;
  applyTags: (tagsText: string) => void;
}

export function useWardrobeSelection(visibleItems: readonly WardrobeItem[]): WardrobeSelection {
  const { updateItem } = useWardrobe();
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const selectedItems = selectItemsByIds(visibleItems, selectedIds);
  const allAreFavorites = areAllFavorites(selectedItems);

  function updateSelectedItems(change: (item: WardrobeItem) => WardrobeItem) {
    selectedItems.forEach((item) => updateItem(change(item)));
  }

  return {
    isSelecting,
    selectedCount: selectedItems.length,
    allAreFavorites,
    isSelected: (pieceId) => selectedIds.includes(pieceId),
    toggleSelecting: () => {
      setIsSelecting((current) => !current);
      setSelectedIds([]);
    },
    toggleItem: (pieceId) => setSelectedIds(toggleId(selectedIds, pieceId)),
    selectAll: () => setSelectedIds(visibleItems.map((item) => item.piece.id)),
    clearSelection: () => setSelectedIds([]),
    applyAvailability: (availability) =>
      updateSelectedItems((item) => withAvailability(item, availability)),
    applyFavorite: () => updateSelectedItems((item) => withFavorite(item, !allAreFavorites)),
    applyTags: (tagsText) => updateSelectedItems((item) => withTags(item, tagsText)),
  };
}
