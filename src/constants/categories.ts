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
}

/** Les catégories DummyJSON retenues pour Cintré (49 pièces au total). */
export const CATEGORIES: readonly Category[] = [
  { slug: 'mens-shirts', type: 'chemises' },
  { slug: 'mens-shoes', type: 'chaussures' },
  { slug: 'mens-watches', type: 'montres' },
  { slug: 'tops', type: 'hauts' },
  { slug: 'womens-dresses', type: 'robes' },
  { slug: 'womens-shoes', type: 'chaussures' },
  { slug: 'womens-bags', type: 'sacs' },
  { slug: 'womens-watches', type: 'montres' },
  { slug: 'womens-jewellery', type: 'bijoux' },
  { slug: 'sunglasses', type: 'lunettes' },
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
