import {
  CLOTHING_CATEGORIES,
  PIECE_TYPES,
  TITLE_KEYWORD_RULES,
  type PieceType,
} from '../constants/categories';
import {
  ALL_PIECE_TYPES,
  type PieceTypeFilter,
} from '../contexts/catalogFilters/catalogFiltersReducer';
import { normalizeForSearch } from './text';

function findPieceTypeOfCategory(categorySlug: string): PieceType | undefined {
  return CLOTHING_CATEGORIES.find((category) => category.slug === categorySlug)?.pieceType;
}

function findPieceTypeInTitle(title: string): PieceType | undefined {
  const words = normalizeForSearch(title).split(/\s+/);
  return TITLE_KEYWORD_RULES.find((rule) =>
    rule.keywords.some((keyword) => words.includes(keyword)),
  )?.pieceType;
}

export function classifyPieceType(title: string, categorySlug: string): PieceType | undefined {
  const categoryPieceType = findPieceTypeOfCategory(categorySlug);
  if (!categoryPieceType) return undefined;
  return findPieceTypeInTitle(title) ?? categoryPieceType;
}

export function toPieceTypeFilter(value: string): PieceTypeFilter {
  return PIECE_TYPES.find((pieceType) => pieceType === value) ?? ALL_PIECE_TYPES;
}
