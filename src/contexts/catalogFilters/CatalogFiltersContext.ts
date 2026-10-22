import { createContext } from 'react';
import type { CatalogFilters, TypeFilter } from './catalogFiltersReducer';

export interface CatalogFiltersValue {
  filters: CatalogFilters;
  setQuery: (query: string) => void;
  setType: (type: TypeFilter) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

/** null par défaut : permet de détecter un oubli du Provider (voir useCatalogFilters). */
export const CatalogFiltersContext = createContext<CatalogFiltersValue | null>(null);
