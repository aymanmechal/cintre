import { PIECE_TYPE_LABELS } from '../constants/categories';
import {
  ALL_PIECE_TYPES,
  type CatalogFilters,
  type PieceTypeFilter,
} from '../contexts/catalogFilters/catalogFiltersReducer';
import type { Piece } from '../types/piece';
import { normalizeForSearch } from './text';

function buildSearchableText(piece: Piece): string {
  return [piece.title, piece.brand ?? '', PIECE_TYPE_LABELS[piece.pieceType]].join(' ');
}

function matchesSearchQuery(piece: Piece, query: string): boolean {
  const normalizedQuery = normalizeForSearch(query);
  return normalizeForSearch(buildSearchableText(piece)).includes(normalizedQuery);
}

function matchesPieceType(piece: Piece, pieceType: PieceTypeFilter): boolean {
  return pieceType === ALL_PIECE_TYPES || piece.pieceType === pieceType;
}

export function filterPieces(pieces: readonly Piece[], filters: CatalogFilters): Piece[] {
  return pieces.filter(
    (piece) =>
      matchesSearchQuery(piece, filters.query) && matchesPieceType(piece, filters.pieceType),
  );
}

export function hasActiveFilters(filters: CatalogFilters): boolean {
  return filters.query.trim() !== '' || filters.pieceType !== ALL_PIECE_TYPES;
}
