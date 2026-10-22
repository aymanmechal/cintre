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

export const OUTFIT_SLOT_PROMPTS: Record<OutfitSlot, string> = {
  [OutfitSlot.Top]: 'Choisis ton haut',
  [OutfitSlot.Bottom]: 'Choisis ton bas',
  [OutfitSlot.Shoes]: 'Choisis tes chaussures',
  [OutfitSlot.Accessory]: 'Choisis tes accessoires',
};

export const MAX_ACCESSORIES_PER_OUTFIT = 4;

export const OUTFIT_SLOT_CAPACITY: Record<OutfitSlot, number> = {
  [OutfitSlot.Top]: 1,
  [OutfitSlot.Bottom]: 1,
  [OutfitSlot.Shoes]: 1,
  [OutfitSlot.Accessory]: MAX_ACCESSORIES_PER_OUTFIT,
};

export const OUTFIT_SLOTS = Object.values(OutfitSlot);

export const FIRST_OUTFIT_SLOT = OutfitSlot.Top;

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
