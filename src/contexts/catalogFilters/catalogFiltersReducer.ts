import { FIRST_PAGE } from '../../constants/catalog';
import type { PieceType } from '../../constants/categories';

export const ALL_PIECE_TYPES = 'tous';

export type PieceTypeFilter = PieceType | typeof ALL_PIECE_TYPES;

export interface CatalogFilters {
  query: string;
  pieceType: PieceTypeFilter;
  page: number;
}

export enum CatalogFiltersActionType {
  QueryChanged = 'queryChanged',
  PieceTypeChanged = 'pieceTypeChanged',
  PageChanged = 'pageChanged',
  FiltersReset = 'filtersReset',
}

export type CatalogFiltersAction =
  | { type: CatalogFiltersActionType.QueryChanged; query: string }
  | { type: CatalogFiltersActionType.PieceTypeChanged; pieceType: PieceTypeFilter }
  | { type: CatalogFiltersActionType.PageChanged; page: number }
  | { type: CatalogFiltersActionType.FiltersReset };

export const INITIAL_CATALOG_FILTERS: CatalogFilters = {
  query: '',
  pieceType: ALL_PIECE_TYPES,
  page: FIRST_PAGE,
};

export function catalogFiltersReducer(
  filters: CatalogFilters,
  action: CatalogFiltersAction,
): CatalogFilters {
  switch (action.type) {
    case CatalogFiltersActionType.QueryChanged:
      return { ...filters, query: action.query, page: FIRST_PAGE };
    case CatalogFiltersActionType.PieceTypeChanged:
      return { ...filters, pieceType: action.pieceType, page: FIRST_PAGE };
    case CatalogFiltersActionType.PageChanged:
      return { ...filters, page: action.page };
    case CatalogFiltersActionType.FiltersReset:
      return INITIAL_CATALOG_FILTERS;
  }
}
