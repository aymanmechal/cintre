import type { ColorHarmony, OutfitSlot } from '../constants/outfits';
import type { Occasion } from '../constants/occasions';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

export interface Outfit {
  id: string;
  name: string;
  pieceIds: number[];
  note: string;
  score: number;
  occasion: Occasion | null;
}

export type OutfitSelection = Record<OutfitSlot, number[]>;

export interface OutfitIdea {
  key: string;
  items: WardrobeItem[];
  harmony: ColorHarmony;
}
