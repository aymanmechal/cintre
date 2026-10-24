import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

export interface TomorrowPlan {
  outfitName: string;
  items: WardrobeItem[];
  unavailableItems: WardrobeItem[];
}
