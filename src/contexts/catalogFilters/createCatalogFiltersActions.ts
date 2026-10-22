import type { Dispatch } from 'react';
import { CatalogFiltersActionType, type CatalogFiltersAction } from './catalogFiltersReducer';
import type { CatalogFiltersActions } from './CatalogFiltersContext';

export function createCatalogFiltersActions(
  dispatch: Dispatch<CatalogFiltersAction>,
): CatalogFiltersActions {
  return {
    changeQuery: (query) => dispatch({ type: CatalogFiltersActionType.QueryChanged, query }),
    changePieceType: (pieceType) =>
      dispatch({ type: CatalogFiltersActionType.PieceTypeChanged, pieceType }),
    changePage: (page) => dispatch({ type: CatalogFiltersActionType.PageChanged, page }),
    resetFilters: () => dispatch({ type: CatalogFiltersActionType.FiltersReset }),
  };
}
