import type { OwnershipStatus } from '../constants/wardrobe';
import type { WardrobeGrouping, WardrobeSortOrder } from '../constants/wardrobeView';
import type { PieceType } from '../../../shared/pieces/constants/categories';
import type { PieceColor } from '../../../shared/pieces/constants/colors';
import type { Season } from '../../../shared/pieces/constants/seasons';
import type { WardrobeItem } from './wardrobe';

export interface WardrobeView {
  status: OwnershipStatus;
  search: string;
  pieceTypes: readonly PieceType[];
  colors: readonly PieceColor[];
  season: Season | null;
  tag: string | null;
  onlyFavorites: boolean;
  onlyAvailable: boolean;
  sortOrder: WardrobeSortOrder;
  grouping: WardrobeGrouping;
}

export interface WardrobeGroup {
  id: string;
  title: string | null;
  items: WardrobeItem[];
}
