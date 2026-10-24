import type { Outfit } from '../../outfits/types/outfit';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

export interface SharedLook {
  name: string;
  image: string;
}

export interface SharedOutfit {
  id: string;
  title: string;
  looks: SharedLook[];
  votes: string[];
}

export interface MyShare {
  id: string;
  title: string;
  votes: string[];
}

export interface ShareEntry {
  outfit: Outfit;
  items: readonly WardrobeItem[];
}

export interface VoteChoice {
  value: string;
  emoji: string;
  label: string;
}
