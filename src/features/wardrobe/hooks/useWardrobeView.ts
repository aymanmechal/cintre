import { useState } from 'react';
import type { OwnershipStatus } from '../constants/wardrobe';
import {
  INITIAL_WARDROBE_VIEW,
  NO_FILTERS,
  type WardrobeGrouping,
  type WardrobeSortOrder,
} from '../constants/wardrobeView';
import type { PieceType } from '../../../shared/pieces/constants/categories';
import type { PieceColor } from '../../../shared/pieces/constants/colors';
import type { Season } from '../../../shared/pieces/constants/seasons';
import { useWardrobe } from '../context/useWardrobe';
import type { WardrobeGroup, WardrobeView } from '../types/wardrobeView';
import { collectTags, countItemsByStatus } from '../utils/wardrobe';
import { buildWardrobeGroups, resolveGrouping, toggleValue } from '../utils/wardrobeView';

export interface WardrobeViewState {
  view: WardrobeView;
  groups: WardrobeGroup[];
  tags: string[];
  countOfStatus: (status: OwnershipStatus) => number;
  changeStatus: (status: OwnershipStatus) => void;
  changeSearch: (search: string) => void;
  togglePieceType: (pieceType: PieceType) => void;
  clearPieceTypes: () => void;
  toggleColor: (color: PieceColor) => void;
  clearColors: () => void;
  changeSeason: (season: Season | null) => void;
  changeTag: (tag: string | null) => void;
  toggleOnlyFavorites: () => void;
  toggleOnlyAvailable: () => void;
  resetFilters: () => void;
  changeSortOrder: (sortOrder: WardrobeSortOrder) => void;
  changeGrouping: (grouping: WardrobeGrouping) => void;
}

export function useWardrobeView(): WardrobeViewState {
  const { items } = useWardrobe();
  const [view, setView] = useState(INITIAL_WARDROBE_VIEW);

  function updateView(changes: Partial<WardrobeView>) {
    setView((currentView) => ({ ...currentView, ...changes }));
  }

  return {
    view: { ...view, grouping: resolveGrouping(view.status, view.grouping) },
    groups: buildWardrobeGroups(items, view),
    tags: collectTags(items),
    countOfStatus: (status) => countItemsByStatus(items, status),
    changeStatus: (status) => updateView({ status }),
    changeSearch: (search) => updateView({ search }),
    togglePieceType: (pieceType) =>
      setView((currentView) => ({
        ...currentView,
        pieceTypes: toggleValue(currentView.pieceTypes, pieceType),
      })),
    clearPieceTypes: () => updateView({ pieceTypes: [] }),
    toggleColor: (color) =>
      setView((currentView) => ({
        ...currentView,
        colors: toggleValue(currentView.colors, color),
      })),
    clearColors: () => updateView({ colors: [] }),
    changeSeason: (season) => updateView({ season }),
    changeTag: (tag) => updateView({ tag }),
    toggleOnlyFavorites: () =>
      setView((currentView) => ({ ...currentView, onlyFavorites: !currentView.onlyFavorites })),
    toggleOnlyAvailable: () =>
      setView((currentView) => ({ ...currentView, onlyAvailable: !currentView.onlyAvailable })),
    resetFilters: () => updateView(NO_FILTERS),
    changeSortOrder: (sortOrder) => updateView({ sortOrder }),
    changeGrouping: (grouping) => updateView({ grouping }),
  };
}
