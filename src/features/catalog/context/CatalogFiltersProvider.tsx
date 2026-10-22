import { useMemo, useReducer, type ReactNode } from 'react';
import { CatalogFiltersContext } from './CatalogFiltersContext';
import { catalogFiltersReducer, INITIAL_CATALOG_FILTERS } from './catalogFiltersReducer';
import { createCatalogFiltersActions } from './createCatalogFiltersActions';

interface CatalogFiltersProviderProps {
  children: ReactNode;
}

export function CatalogFiltersProvider({ children }: CatalogFiltersProviderProps) {
  const [filters, dispatch] = useReducer(catalogFiltersReducer, INITIAL_CATALOG_FILTERS);
  const actions = useMemo(() => createCatalogFiltersActions(dispatch), []);
  const value = useMemo(() => ({ filters, ...actions }), [filters, actions]);

  return <CatalogFiltersContext value={value}>{children}</CatalogFiltersContext>;
}
