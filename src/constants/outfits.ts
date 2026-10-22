import { PieceType } from './categories';

export enum OutfitSlot {
  Top = 'haut',
  Bottom = 'bas',
  Shoes = 'chaussures',
  Accessory = 'accessoire',
}

export const OUTFIT_SLOT_LABELS: Record<OutfitSlot, string> = {
  [OutfitSlot.Top]: 'Haut',
  [OutfitSlot.Bottom]: 'Bas',
  [OutfitSlot.Shoes]: 'Chaussures',
  [OutfitSlot.Accessory]: 'Accessoire',
};

export const OUTFIT_SLOTS = Object.values(OutfitSlot);

export const OUTFIT_SLOT_BY_PIECE_TYPE: Record<PieceType, OutfitSlot> = {
  [PieceType.Shirts]: OutfitSlot.Top,
  [PieceType.Tops]: OutfitSlot.Top,
  [PieceType.Dresses]: OutfitSlot.Top,
  [PieceType.Bottoms]: OutfitSlot.Bottom,
  [PieceType.Shoes]: OutfitSlot.Shoes,
  [PieceType.Bags]: OutfitSlot.Accessory,
  [PieceType.Watches]: OutfitSlot.Accessory,
  [PieceType.Jewellery]: OutfitSlot.Accessory,
  [PieceType.Sunglasses]: OutfitSlot.Accessory,
};

export enum OutfitReadiness {
  Ready = 'prete',
  Goal = 'objectif',
}

export const OUTFIT_READINESS_LABELS: Record<OutfitReadiness, string> = {
  [OutfitReadiness.Ready]: 'Prête',
  [OutfitReadiness.Goal]: 'Objectif',
};

export const MIN_PIECES_PER_OUTFIT = 2;

export const OUTFITS_STORAGE_KEY = 'cintre.outfits';

export const NOT_ENOUGH_PIECES_MESSAGE = `Choisis au moins ${MIN_PIECES_PER_OUTFIT} pièces.`;
