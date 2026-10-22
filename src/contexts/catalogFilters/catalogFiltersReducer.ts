import { FIRST_PAGE } from '../../constants/catalog';
import type { PieceType } from '../../constants/categories';

export const ALL_PIECE_TYPES = 'tous';

export type PieceTypeFilter = PieceType | typeof ALL_PIECE_TYPES;

export interface CatalogFilters {
  query: string;
  pieceType: PieceTypeFilter;
  page: number;
}

export type CatalogFiltersAction =
  | { type: 'queryChanged'; query: string }
  | { type: 'pieceTypeChanged'; pieceType: PieceTypeFilter }
  | { type: 'pageChanged'; page: number }
  | { type: 'filtersReset' };

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
    case 'queryChanged':
      return { ...filters, query: action.query, page: FIRST_PAGE };
    case 'pieceTypeChanged':
      return { ...filters, pieceType: action.pieceType, page: FIRST_PAGE };
    case 'pageChanged':
      return { ...filters, page: action.page };
    case 'filtersReset':
      return INITIAL_CATALOG_FILTERS;
  }
}
