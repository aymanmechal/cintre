import { createContext } from 'react';
import type { CatalogFilters, PieceTypeFilter } from './catalogFiltersReducer';

export interface CatalogFiltersActions {
  changeQuery: (query: string) => void;
  changePieceType: (pieceType: PieceTypeFilter) => void;
  changePage: (page: number) => void;
  resetFilters: () => void;
}

export interface CatalogFiltersValue extends CatalogFiltersActions {
  filters: CatalogFilters;
}

export const CatalogFiltersContext = createContext<CatalogFiltersValue | null>(null);
