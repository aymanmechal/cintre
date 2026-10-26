export enum PieceType {
  Shirts = 'chemises',
  Tops = 'hauts',
  Jackets = 'vestes',
  Bottoms = 'bas',
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
  [PieceType.Jackets]: 'Vestes',
  [PieceType.Bottoms]: 'Bas',
  [PieceType.Dresses]: 'Robes',
  [PieceType.Shoes]: 'Chaussures',
  [PieceType.Bags]: 'Sacs',
  [PieceType.Watches]: 'Montres',
  [PieceType.Jewellery]: 'Bijoux',
  [PieceType.Sunglasses]: 'Lunettes',
};

export const PIECE_TYPES = Object.values(PieceType);

export const DEFAULT_PIECE_TYPE = PieceType.Tops;

export const ALL_PIECE_TYPES = 'tous';

export type PieceTypeFilter = PieceType | typeof ALL_PIECE_TYPES;
