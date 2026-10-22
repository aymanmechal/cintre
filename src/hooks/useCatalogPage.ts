import { PIECES_PER_PAGE } from '../constants/catalog';
import { useCatalogFilters } from '../contexts/catalogFilters/useCatalogFilters';
import type { Piece } from '../types/piece';
import { filterPieces } from '../utils/filterPieces';
import { sortPieces } from '../utils/sortPieces';
import { clampPage, countPages, getPageItems } from '../utils/pagination';

export interface CatalogPageResult {
  matchingCount: number;
  visiblePieces: Piece[];
  page: number;
  pageCount: number;
}

export function useCatalogPage(pieces: readonly Piece[]): CatalogPageResult {
  const { filters } = useCatalogFilters();

  const matchingPieces = sortPieces(filterPieces(pieces, filters), filters.sortOrder);
  const pageCount = countPages(matchingPieces.length, PIECES_PER_PAGE);
  const page = clampPage(filters.page, pageCount);

  return {
    matchingCount: matchingPieces.length,
    visiblePieces: getPageItems(matchingPieces, page, PIECES_PER_PAGE),
    page,
    pageCount,
  };
}
