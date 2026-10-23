import { describe, expect, it } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { ALL_BRANDS } from '../constants/catalog';
import { PieceSortOrder } from '../constants/sorting';
import {
  catalogFiltersReducer,
  CatalogFiltersActionType,
  INITIAL_CATALOG_FILTERS,
} from './catalogFiltersReducer';

const ON_PAGE_THREE = { ...INITIAL_CATALOG_FILTERS, page: 3 };

describe('catalogFiltersReducer', () => {
  it('change la recherche et revient à la page 1', () => {
    const next = catalogFiltersReducer(ON_PAGE_THREE, {
      type: CatalogFiltersActionType.QueryChanged,
      query: 'lin',
    });
    expect(next).toMatchObject({ query: 'lin', page: 1 });
  });

  it('change le type et revient à la page 1', () => {
    const next = catalogFiltersReducer(ON_PAGE_THREE, {
      type: CatalogFiltersActionType.PieceTypeChanged,
      pieceType: PieceType.Shoes,
    });
    expect(next).toMatchObject({ pieceType: PieceType.Shoes, page: 1 });
  });

  it('réinitialise la marque quand le type change', () => {
    const withBrand = { ...ON_PAGE_THREE, brand: 'Norse' };
    const next = catalogFiltersReducer(withBrand, {
      type: CatalogFiltersActionType.PieceTypeChanged,
      pieceType: PieceType.Shoes,
    });
    expect(next.brand).toBe(ALL_BRANDS);
  });

  it('change la marque et revient à la page 1', () => {
    const next = catalogFiltersReducer(ON_PAGE_THREE, {
      type: CatalogFiltersActionType.BrandChanged,
      brand: 'Norse',
    });
    expect(next).toMatchObject({ brand: 'Norse', page: 1 });
  });

  it('change le tri et revient à la page 1', () => {
    const next = catalogFiltersReducer(ON_PAGE_THREE, {
      type: CatalogFiltersActionType.SortOrderChanged,
      sortOrder: PieceSortOrder.PriceAscending,
    });
    expect(next).toMatchObject({ sortOrder: PieceSortOrder.PriceAscending, page: 1 });
  });

  it('change de page sans toucher aux autres filtres', () => {
    const next = catalogFiltersReducer(
      { ...INITIAL_CATALOG_FILTERS, query: 'lin' },
      { type: CatalogFiltersActionType.PageChanged, page: 2 },
    );
    expect(next).toMatchObject({ query: 'lin', page: 2 });
  });

  it('remet tous les filtres à zéro', () => {
    const next = catalogFiltersReducer(
      { ...ON_PAGE_THREE, query: 'lin', brand: 'Norse' },
      { type: CatalogFiltersActionType.FiltersReset },
    );
    expect(next).toEqual(INITIAL_CATALOG_FILTERS);
  });
});
