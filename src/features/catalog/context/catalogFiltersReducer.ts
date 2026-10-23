import { ALL_BRANDS, FIRST_PAGE, type BrandFilter } from '../constants/catalog';
import { ALL_PIECE_TYPES, type PieceTypeFilter } from '../../../shared/pieces/constants/categories';
import { PieceSortOrder } from '../constants/sorting';

export interface CatalogFilters {
  query: string;
  pieceType: PieceTypeFilter;
  brand: BrandFilter;
  sortOrder: PieceSortOrder;
  page: number;
}

export enum CatalogFiltersActionType {
  QueryChanged = 'queryChanged',
  PieceTypeChanged = 'pieceTypeChanged',
  BrandChanged = 'brandChanged',
  SortOrderChanged = 'sortOrderChanged',
  PageChanged = 'pageChanged',
  FiltersReset = 'filtersReset',
}

export type CatalogFiltersAction =
  | { type: CatalogFiltersActionType.QueryChanged; query: string }
  | { type: CatalogFiltersActionType.PieceTypeChanged; pieceType: PieceTypeFilter }
  | { type: CatalogFiltersActionType.BrandChanged; brand: BrandFilter }
  | { type: CatalogFiltersActionType.SortOrderChanged; sortOrder: PieceSortOrder }
  | { type: CatalogFiltersActionType.PageChanged; page: number }
  | { type: CatalogFiltersActionType.FiltersReset };

export const INITIAL_CATALOG_FILTERS: CatalogFilters = {
  query: '',
  pieceType: ALL_PIECE_TYPES,
  brand: ALL_BRANDS,
  sortOrder: PieceSortOrder.Default,
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
      return { ...filters, pieceType: action.pieceType, brand: ALL_BRANDS, page: FIRST_PAGE };
    case CatalogFiltersActionType.BrandChanged:
      return { ...filters, brand: action.brand, page: FIRST_PAGE };
    case CatalogFiltersActionType.SortOrderChanged:
      return { ...filters, sortOrder: action.sortOrder, page: FIRST_PAGE };
    case CatalogFiltersActionType.PageChanged:
      return { ...filters, page: action.page };
    case CatalogFiltersActionType.FiltersReset:
      return INITIAL_CATALOG_FILTERS;
  }
}
