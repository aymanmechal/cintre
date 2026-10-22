import { CLOTHING_CATEGORIES, PIECE_TYPES, type PieceType } from '../constants/categories';

export function isClothingCategory(categorySlug: string): boolean {
  return CLOTHING_CATEGORIES.some((category) => category.slug === categorySlug);
}

export function findPieceTypeOfCategory(categorySlug: string): PieceType | undefined {
  return CLOTHING_CATEGORIES.find((category) => category.slug === categorySlug)?.pieceType;
}

export function getPieceTypeLabel(pieceType: PieceType): string {
  return PIECE_TYPES.find((type) => type.id === pieceType)?.label ?? pieceType;
}

export function getCategoryLabel(categorySlug: string): string {
  const pieceType = findPieceTypeOfCategory(categorySlug);
  return pieceType ? getPieceTypeLabel(pieceType) : categorySlug;
}
