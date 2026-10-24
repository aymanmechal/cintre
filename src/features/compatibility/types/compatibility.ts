import type { OutfitSlot } from '../../outfits/constants/outfits';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

export interface CompatibilityNode {
  item: WardrobeItem;
  outfitCount: number;
  partners: WardrobeItem[];
}

export interface PartnerGroup {
  slot: OutfitSlot;
  items: WardrobeItem[];
}
