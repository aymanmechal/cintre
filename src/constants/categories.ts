export enum PieceType {
  Shirts = 'chemises',
  Tops = 'hauts',
  Dresses = 'robes',
  Shoes = 'chaussures',
  Bags = 'sacs',
  Watches = 'montres',
  Jewellery = 'bijoux',
  Sunglasses = 'lunettes',
}

export const PIECE_TYPE_LABELS: Record<PieceType, string> = {
  [PieceType.Shirts]: 'Chemises',
  [PieceType.Tops]: 'Hauts',
  [PieceType.Dresses]: 'Robes',
  [PieceType.Shoes]: 'Chaussures',
  [PieceType.Bags]: 'Sacs',
  [PieceType.Watches]: 'Montres',
  [PieceType.Jewellery]: 'Bijoux',
  [PieceType.Sunglasses]: 'Lunettes de soleil',
};

export const PIECE_TYPES = Object.values(PieceType);

export interface ClothingCategory {
  slug: string;
  pieceType: PieceType;
}

export const CLOTHING_CATEGORIES: readonly ClothingCategory[] = [
  { slug: 'mens-shirts', pieceType: PieceType.Shirts },
  { slug: 'mens-shoes', pieceType: PieceType.Shoes },
  { slug: 'mens-watches', pieceType: PieceType.Watches },
  { slug: 'tops', pieceType: PieceType.Dresses },
  { slug: 'womens-dresses', pieceType: PieceType.Dresses },
  { slug: 'womens-shoes', pieceType: PieceType.Shoes },
  { slug: 'womens-bags', pieceType: PieceType.Bags },
  { slug: 'womens-watches', pieceType: PieceType.Watches },
  { slug: 'womens-jewellery', pieceType: PieceType.Jewellery },
  { slug: 'sunglasses', pieceType: PieceType.Sunglasses },
];

export interface TitleKeywordRule {
  keywords: readonly string[];
  pieceType: PieceType;
}

export const TITLE_KEYWORD_RULES: readonly TitleKeywordRule[] = [
  { keywords: ['tshirt', 't-shirt', 'tee'], pieceType: PieceType.Tops },
  { keywords: ['dress', 'frock', 'gown'], pieceType: PieceType.Dresses },
];
