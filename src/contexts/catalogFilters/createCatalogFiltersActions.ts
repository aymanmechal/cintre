import type { Dispatch } from 'react';
import type { CatalogFiltersAction } from './catalogFiltersReducer';
import type { CatalogFiltersActions } from './CatalogFiltersContext';

export function createCatalogFiltersActions(
  dispatch: Dispatch<CatalogFiltersAction>,
): CatalogFiltersActions {
  return {
    changeQuery: (query) => dispatch({ type: 'queryChanged', query }),
    changePieceType: (pieceType) => dispatch({ type: 'pieceTypeChanged', pieceType }),
    changePage: (page) => dispatch({ type: 'pageChanged', page }),
    resetFilters: () => dispatch({ type: 'filtersReset' }),
  };
}
