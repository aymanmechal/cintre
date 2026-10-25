import { PieceType } from '../../../shared/pieces/constants/categories';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { Season } from '../../../shared/pieces/constants/seasons';

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

export const NO_SCORE = 0;

export const MAX_OUTFIT_SCORE = 5;

export const SCORE_VALUES = [1, 2, 3, 4, 5];

export const OUTFITS_STORAGE_KEY = 'cintre.outfits';

export const IDEA_SLOTS = [OutfitSlot.Top, OutfitSlot.Bottom, OutfitSlot.Shoes];

export const OUTFIT_IDEAS_PAGE_SIZE = 6;

export const OUTFIT_LIST_PAGE_SIZE = 4;

export const PIECE_SHELF_PAGE_SIZE = 6;

export const MIN_COMPARED_OUTFITS = 2;

export const MAX_COMPARED_OUTFITS = 3;

export const NEUTRAL_COLORS: readonly PieceColor[] = [
  PieceColor.Black,
  PieceColor.White,
  PieceColor.Grey,
  PieceColor.Beige,
  PieceColor.Brown,
];

export const OPPOSITE_SEASON: Record<Season, Season | null> = {
  [Season.Summer]: Season.Winter,
  [Season.Winter]: Season.Summer,
  [Season.MidSeason]: null,
  [Season.AllYear]: null,
};

export enum ColorHarmony {
  Neutral = 'neutre',
  Accent = 'touche',
  Bold = 'audacieux',
}

export const COLOR_HARMONY_LABELS: Record<ColorHarmony, string> = {
  [ColorHarmony.Neutral]: 'Tout en neutres',
  [ColorHarmony.Accent]: 'Une touche de couleur',
  [ColorHarmony.Bold]: 'Audacieux',
};
