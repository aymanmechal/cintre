import type { OutfitSlot } from '../constants/outfits';

export interface Outfit {
  id: string;
  name: string;
  pieceIds: number[];
}

export type OutfitSelection = Record<OutfitSlot, number | null>;
