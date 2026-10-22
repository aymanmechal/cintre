import { describe, expect, it } from 'vitest';
import { ALL_PIECE_TYPES, PieceType } from '../../../shared/pieces/constants/categories';
import { makePiece } from '../../../test/factories';
import { INITIAL_CATALOG_FILTERS, type CatalogFilters } from '../context/catalogFiltersReducer';
import { filterPieces, hasActiveFilters } from './filterPieces';

const SHIRT = makePiece({
  id: 1,
  title: 'Chemise en lin',
  brand: 'Norse',
  pieceType: PieceType.Shirts,
});
const SHOES = makePiece({
  id: 2,
  title: 'Derby noir',
  brand: 'Tricker',
  pieceType: PieceType.Shoes,
});
const PIECES = [SHIRT, SHOES];

function filters(changes: Partial<CatalogFilters>): CatalogFilters {
  return { ...INITIAL_CATALOG_FILTERS, ...changes };
}

describe('filterPieces', () => {
  it('garde tout sans filtre', () => {
    expect(filterPieces(PIECES, filters({}))).toEqual(PIECES);
  });

  it('cherche dans le titre sans tenir compte des accents ni de la casse', () => {
    expect(filterPieces(PIECES, filters({ query: 'CHÉMISE' }))).toEqual([SHIRT]);
  });

  it('cherche aussi dans la marque', () => {
    expect(filterPieces(PIECES, filters({ query: 'tricker' }))).toEqual([SHOES]);
  });

  it('filtre par type de pièce', () => {
    expect(filterPieces(PIECES, filters({ pieceType: PieceType.Shoes }))).toEqual([SHOES]);
  });

  it('combine la recherche et le type', () => {
    expect(filterPieces(PIECES, filters({ query: 'derby', pieceType: PieceType.Shirts }))).toEqual(
      [],
    );
  });
});

describe('hasActiveFilters', () => {
  it('est faux par défaut', () => {
    expect(hasActiveFilters(INITIAL_CATALOG_FILTERS)).toBe(false);
  });

  it('est faux quand la recherche ne contient que des espaces', () => {
    expect(hasActiveFilters(filters({ query: '   ' }))).toBe(false);
  });

  it('est vrai avec une recherche', () => {
    expect(hasActiveFilters(filters({ query: 'lin' }))).toBe(true);
  });

  it('est vrai avec un type choisi', () => {
    expect(hasActiveFilters(filters({ pieceType: PieceType.Bags }))).toBe(true);
    expect(hasActiveFilters(filters({ pieceType: ALL_PIECE_TYPES }))).toBe(false);
  });
});
