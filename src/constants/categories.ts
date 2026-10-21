import type { Gender } from '../types/piece';

/** Les types de pièce proposés dans le filtre (plusieurs catégories API peuvent partager un type). */
export const PIECE_TYPES = [
  { id: 'chemises', label: 'Chemises' },
  { id: 'hauts', label: 'Hauts' },
  { id: 'robes', label: 'Robes' },
  { id: 'chaussures', label: 'Chaussures' },
  { id: 'sacs', label: 'Sacs' },
  { id: 'montres', label: 'Montres' },
  { id: 'bijoux', label: 'Bijoux' },
  { id: 'lunettes', label: 'Lunettes de soleil' },
] as const;

export type PieceType = (typeof PIECE_TYPES)[number]['id'];

export interface Category {
  slug: string;
  type: PieceType;
  gender: Gender;
}

/** Les catégories DummyJSON retenues pour Cintré (49 pièces au total). */
export const CATEGORIES: readonly Category[] = [
  { slug: 'mens-shirts', type: 'chemises', gender: 'homme' },
  { slug: 'mens-shoes', type: 'chaussures', gender: 'homme' },
  { slug: 'mens-watches', type: 'montres', gender: 'homme' },
  { slug: 'tops', type: 'hauts', gender: 'mixte' },
  { slug: 'womens-dresses', type: 'robes', gender: 'femme' },
  { slug: 'womens-shoes', type: 'chaussures', gender: 'femme' },
  { slug: 'womens-bags', type: 'sacs', gender: 'femme' },
  { slug: 'womens-watches', type: 'montres', gender: 'femme' },
  { slug: 'womens-jewellery', type: 'bijoux', gender: 'femme' },
  { slug: 'sunglasses', type: 'lunettes', gender: 'mixte' },
];

export function findCategory(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function isClothingCategory(slug: string): boolean {
  return findCategory(slug) !== undefined;
}

export function typeOfCategory(slug: string): PieceType | undefined {
  return findCategory(slug)?.type;
}

export function typeLabel(type: PieceType): string {
  return PIECE_TYPES.find((pieceType) => pieceType.id === type)?.label ?? type;
}

/** Libellé affiché sur une carte, ex. "mens-shoes" → "Chaussures". */
export function categoryLabel(slug: string): string {
  const type = typeOfCategory(slug);
  return type ? typeLabel(type) : slug;
}
