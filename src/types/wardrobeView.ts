import type { OwnershipStatus } from '../constants/wardrobe';
import type { WardrobeGrouping, WardrobeSortOrder } from '../constants/wardrobeView';
import type { PieceTypeFilter } from '../contexts/catalogFilters/catalogFiltersReducer';
import type { WardrobeItem } from './wardrobe';

export interface WardrobeView {
  status: OwnershipStatus;
  pieceType: PieceTypeFilter;
  sortOrder: WardrobeSortOrder;
  grouping: WardrobeGrouping;
}

export interface WardrobeGroup {
  id: string;
  title: string | null;
  items: WardrobeItem[];
}
