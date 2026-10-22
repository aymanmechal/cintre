import { useState } from 'react';
import type { OwnershipStatus } from '../constants/wardrobe';
import {
  INITIAL_WARDROBE_VIEW,
  type WardrobeGrouping,
  type WardrobeSortOrder,
} from '../constants/wardrobeView';
import type { PieceTypeFilter } from '../contexts/catalogFilters/catalogFiltersReducer';
import { useWardrobe } from '../contexts/wardrobe/useWardrobe';
import type { WardrobeGroup, WardrobeView } from '../types/wardrobeView';
import { countItemsByStatus } from '../utils/wardrobe';
import { buildWardrobeGroups, resolveGrouping } from '../utils/wardrobeView';

export interface WardrobeViewState {
  view: WardrobeView;
  groups: WardrobeGroup[];
  isEditing: boolean;
  countOfStatus: (status: OwnershipStatus) => number;
  changeStatus: (status: OwnershipStatus) => void;
  changePieceType: (pieceType: PieceTypeFilter) => void;
  changeSortOrder: (sortOrder: WardrobeSortOrder) => void;
  changeGrouping: (grouping: WardrobeGrouping) => void;
  toggleEditing: () => void;
}

export function useWardrobeView(): WardrobeViewState {
  const { items } = useWardrobe();
  const [view, setView] = useState(INITIAL_WARDROBE_VIEW);
  const [isEditing, setIsEditing] = useState(false);

  function updateView(changes: Partial<WardrobeView>) {
    setView((currentView) => ({ ...currentView, ...changes }));
  }

  return {
    view: { ...view, grouping: resolveGrouping(view.status, view.grouping) },
    groups: buildWardrobeGroups(items, view),
    isEditing,
    countOfStatus: (status) => countItemsByStatus(items, status),
    changeStatus: (status) => updateView({ status }),
    changePieceType: (pieceType) => updateView({ pieceType }),
    changeSortOrder: (sortOrder) => updateView({ sortOrder }),
    changeGrouping: (grouping) => updateView({ grouping }),
    toggleEditing: () => setIsEditing((current) => !current),
  };
}
