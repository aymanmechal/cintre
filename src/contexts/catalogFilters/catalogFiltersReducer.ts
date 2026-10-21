import type { PieceType } from '../../constants/categories';
import type { Gender } from '../../types/piece';

export type TypeFilter = PieceType | 'tous';
export type GenderFilter = Exclude<Gender, 'mixte'> | 'tous';

export interface CatalogFilters {
  query: string;
  type: TypeFilter;
  gender: GenderFilter;
  page: number;
}

export type CatalogFiltersAction =
  | { type: 'setQuery'; query: string }
  | { type: 'setType'; pieceType: TypeFilter }
  | { type: 'setGender'; gender: GenderFilter }
  | { type: 'setPage'; page: number }
  | { type: 'reset' };

export const INITIAL_FILTERS: CatalogFilters = {
  query: '',
  type: 'tous',
  gender: 'tous',
  page: 1,
};

/**
 * Toutes les règles de changement d'état au même endroit.
 * Règle métier : changer un critère ramène toujours en page 1.
 */
export function catalogFiltersReducer(
  state: CatalogFilters,
  action: CatalogFiltersAction,
): CatalogFilters {
  switch (action.type) {
    case 'setQuery':
      return { ...state, query: action.query, page: 1 };
    case 'setType':
      return { ...state, type: action.pieceType, page: 1 };
    case 'setGender':
      return { ...state, gender: action.gender, page: 1 };
    case 'setPage':
      return { ...state, page: action.page };
    case 'reset':
      return INITIAL_FILTERS;
  }
}
