import { useMemo, useReducer, type ReactNode } from 'react';
import { CatalogFiltersContext, type CatalogFiltersValue } from './CatalogFiltersContext';
import { catalogFiltersReducer, INITIAL_FILTERS } from './catalogFiltersReducer';

interface CatalogFiltersProviderProps {
  children: ReactNode;
}

export function CatalogFiltersProvider({ children }: CatalogFiltersProviderProps) {
  const [filters, dispatch] = useReducer(catalogFiltersReducer, INITIAL_FILTERS);

  // useMemo : le même objet tant que les filtres ne changent pas,
  // sinon tous les composants abonnés se re-rendraient à chaque rendu du Provider.
  const value = useMemo<CatalogFiltersValue>(
    () => ({
      filters,
      setQuery: (query) => dispatch({ type: 'setQuery', query }),
      setType: (pieceType) => dispatch({ type: 'setType', pieceType }),
      setPage: (page) => dispatch({ type: 'setPage', page }),
      resetFilters: () => dispatch({ type: 'reset' }),
    }),
    [filters],
  );

  return <CatalogFiltersContext value={value}>{children}</CatalogFiltersContext>;
}
