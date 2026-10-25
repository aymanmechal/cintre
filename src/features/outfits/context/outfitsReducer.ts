import type { Outfit } from '../types/outfit';
import { hasSamePieces } from '../utils/outfits';

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

function isBlockedByDuplicate(outfits: Outfit[], updated: Outfit): boolean {
  const current = outfits.find((outfit) => outfit.id === updated.id);
  const hasChangedPieces = !current || !hasSamePieces([current], updated.pieceIds);
  return hasChangedPieces && hasSamePieces(outfits, updated.pieceIds, updated.id);
}

export function outfitsReducer(outfits: Outfit[], action: OutfitsAction): Outfit[] {
  switch (action.type) {
    case OutfitsActionType.OutfitCreated:
      if (hasSamePieces(outfits, action.outfit.pieceIds)) return outfits;
      return [action.outfit, ...outfits];
    case OutfitsActionType.OutfitUpdated:
      if (isBlockedByDuplicate(outfits, action.outfit)) return outfits;
      return outfits.map((outfit) => (outfit.id === action.outfit.id ? action.outfit : outfit));
    case OutfitsActionType.OutfitDeleted:
      return outfits.filter((outfit) => outfit.id !== action.outfitId);
    case OutfitsActionType.OutfitsReplaced:
      return action.outfits;
  }
}
