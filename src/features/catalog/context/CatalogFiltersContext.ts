import { createContext } from 'react';
import type { BrandFilter } from '../constants/catalog';
import type { PieceSortOrder } from '../constants/sorting';
import type { PieceTypeFilter } from '../../../shared/pieces/constants/categories';
import type { CatalogFilters } from './catalogFiltersReducer';

export interface CatalogFiltersActions {
  changeQuery: (query: string) => void;
  changePieceType: (pieceType: PieceTypeFilter) => void;
  changeBrand: (brand: BrandFilter) => void;
  changeSortOrder: (sortOrder: PieceSortOrder) => void;
  changePage: (page: number) => void;
  resetFilters: () => void;
}

export interface CatalogFiltersValue extends CatalogFiltersActions {
  filters: CatalogFilters;
}

export const CatalogFiltersContext = createContext<CatalogFiltersValue | null>(null);
