import type { Outfit } from '../types/outfit';

export enum OutfitsActionType {
  OutfitCreated = 'outfitCreated',
  OutfitUpdated = 'outfitUpdated',
  OutfitDeleted = 'outfitDeleted',
  OutfitsReplaced = 'outfitsReplaced',
}

export type OutfitsAction =
  | { type: OutfitsActionType.OutfitCreated; outfit: Outfit }
  | { type: OutfitsActionType.OutfitUpdated; outfit: Outfit }
  | { type: OutfitsActionType.OutfitDeleted; outfitId: string }
  | { type: OutfitsActionType.OutfitsReplaced; outfits: Outfit[] };

export function outfitsReducer(outfits: Outfit[], action: OutfitsAction): Outfit[] {
  switch (action.type) {
    case OutfitsActionType.OutfitCreated:
      return [action.outfit, ...outfits];
    case OutfitsActionType.OutfitUpdated:
      return outfits.map((outfit) => (outfit.id === action.outfit.id ? action.outfit : outfit));
    case OutfitsActionType.OutfitDeleted:
      return outfits.filter((outfit) => outfit.id !== action.outfitId);
    case OutfitsActionType.OutfitsReplaced:
      return action.outfits;
  }
}
