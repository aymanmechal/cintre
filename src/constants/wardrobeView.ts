import { ALL_PIECE_TYPES } from '../contexts/catalogFilters/catalogFiltersReducer';
import type { WardrobeView } from '../types/wardrobeView';
import { OwnershipStatus } from './wardrobe';

export enum WardrobeSortOrder {
  Recent = 'recentes',
  NameAscending = 'nom',
  PriceAscending = 'prix-croissant',
  PriceDescending = 'prix-decroissant',
  LeastRecentlyWorn = 'oubliees',
}

export const WARDROBE_SORT_ORDER_LABELS: Record<WardrobeSortOrder, string> = {
  [WardrobeSortOrder.Recent]: 'Ajout récent',
  [WardrobeSortOrder.NameAscending]: 'Nom (A → Z)',
  [WardrobeSortOrder.PriceAscending]: 'Prix croissant',
  [WardrobeSortOrder.PriceDescending]: 'Prix décroissant',
  [WardrobeSortOrder.LeastRecentlyWorn]: "Oubliées d'abord",
};

export const WARDROBE_SORT_ORDERS = Object.values(WardrobeSortOrder);

export enum WardrobeGrouping {
  Location = 'rangement',
  PieceType = 'type',
  None = 'aucun',
}

export const WARDROBE_GROUPING_LABELS: Record<WardrobeGrouping, string> = {
  [WardrobeGrouping.Location]: 'Par rangement',
  [WardrobeGrouping.PieceType]: 'Par type',
  [WardrobeGrouping.None]: 'Sans regroupement',
};

export const WARDROBE_GROUPINGS = Object.values(WardrobeGrouping);

export const GROUPINGS_BY_STATUS: Record<OwnershipStatus, readonly WardrobeGrouping[]> = {
  [OwnershipStatus.Owned]: WARDROBE_GROUPINGS,
  [OwnershipStatus.Wanted]: [WardrobeGrouping.PieceType, WardrobeGrouping.None],
};

export const UNGROUPED_ID = 'toutes';

export const INITIAL_WARDROBE_VIEW: WardrobeView = {
  status: OwnershipStatus.Owned,
  pieceType: ALL_PIECE_TYPES,
  sortOrder: WardrobeSortOrder.Recent,
  grouping: WardrobeGrouping.Location,
};
