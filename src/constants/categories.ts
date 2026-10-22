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

export interface ClothingCategory {
  slug: string;
  pieceType: PieceType;
}

export const CLOTHING_CATEGORIES: readonly ClothingCategory[] = [
  { slug: 'mens-shirts', pieceType: 'chemises' },
  { slug: 'mens-shoes', pieceType: 'chaussures' },
  { slug: 'mens-watches', pieceType: 'montres' },
  { slug: 'tops', pieceType: 'hauts' },
  { slug: 'womens-dresses', pieceType: 'robes' },
  { slug: 'womens-shoes', pieceType: 'chaussures' },
  { slug: 'womens-bags', pieceType: 'sacs' },
  { slug: 'womens-watches', pieceType: 'montres' },
  { slug: 'womens-jewellery', pieceType: 'bijoux' },
  { slug: 'sunglasses', pieceType: 'lunettes' },
];
