import { createContext } from 'react';
import type { Outfit } from '../types/outfit';

export interface OutfitsActions {
  createOutfit: (outfit: Outfit) => void;
  updateOutfit: (outfit: Outfit) => void;
  deleteOutfit: (outfitId: string) => void;
  replaceOutfits: (outfits: Outfit[]) => void;
}

export interface OutfitsValue extends OutfitsActions {
  outfits: Outfit[];
}

export const OutfitsContext = createContext<OutfitsValue | null>(null);
