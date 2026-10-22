import { useContext } from 'react';
import { CatalogFiltersContext, type CatalogFiltersValue } from './CatalogFiltersContext';

export function useCatalogFilters(): CatalogFiltersValue {
  const context = useContext(CatalogFiltersContext);

  if (context === null) {
    throw new Error('useCatalogFilters doit être utilisé dans <CatalogFiltersProvider>.');
  }

  return context;
}
