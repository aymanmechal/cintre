import { PIECE_SORT_ORDERS, PieceSortOrder } from '../constants/sorting';
import type { Piece } from '../../../shared/pieces/types/piece';

function compareByPriceAscending(first: Piece, second: Piece): number {
  return first.price - second.price;
}

function compareByPriceDescending(first: Piece, second: Piece): number {
  return second.price - first.price;
}

export function sortPieces(pieces: readonly Piece[], sortOrder: PieceSortOrder): Piece[] {
  switch (sortOrder) {
    case PieceSortOrder.Default:
      return [...pieces];
    case PieceSortOrder.PriceAscending:
      return pieces.toSorted(compareByPriceAscending);
    case PieceSortOrder.PriceDescending:
      return pieces.toSorted(compareByPriceDescending);
  }
}

export function toPieceSortOrder(value: string): PieceSortOrder {
  return PIECE_SORT_ORDERS.find((sortOrder) => sortOrder === value) ?? PieceSortOrder.Default;
}
