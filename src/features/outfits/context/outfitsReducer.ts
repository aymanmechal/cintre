import type { Outfit } from '../types/outfit';

export enum OutfitsActionType {
  OutfitCreated = 'outfitCreated',
  OutfitDeleted = 'outfitDeleted',
}

export type OutfitsAction =
  | { type: OutfitsActionType.OutfitCreated; outfit: Outfit }
  | { type: OutfitsActionType.OutfitDeleted; outfitId: string };

export function outfitsReducer(outfits: Outfit[], action: OutfitsAction): Outfit[] {
  switch (action.type) {
    case OutfitsActionType.OutfitCreated:
      return [action.outfit, ...outfits];
    case OutfitsActionType.OutfitDeleted:
      return outfits.filter((outfit) => outfit.id !== action.outfitId);
  }
}
