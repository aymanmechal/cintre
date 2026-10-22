import {
  CLOTHING_CATEGORIES,
  PIECE_TYPE_LABELS,
  PIECE_TYPES,
  type PieceType,
} from '../constants/categories';
import {
  ALL_PIECE_TYPES,
  type PieceTypeFilter,
} from '../contexts/catalogFilters/catalogFiltersReducer';

export function isClothingCategory(categorySlug: string): boolean {
  return CLOTHING_CATEGORIES.some((category) => category.slug === categorySlug);
}

export function findPieceTypeOfCategory(categorySlug: string): PieceType | undefined {
  return CLOTHING_CATEGORIES.find((category) => category.slug === categorySlug)?.pieceType;
}

export function getCategoryLabel(categorySlug: string): string {
  const pieceType = findPieceTypeOfCategory(categorySlug);
  return pieceType ? PIECE_TYPE_LABELS[pieceType] : categorySlug;
}

export function toPieceTypeFilter(value: string): PieceTypeFilter {
  return PIECE_TYPES.find((pieceType) => pieceType === value) ?? ALL_PIECE_TYPES;
}
