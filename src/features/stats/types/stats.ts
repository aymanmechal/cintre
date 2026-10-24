import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

export interface PieceStat {
  item: WardrobeItem;
  wearCount: number;
  costPerWear: number | null;
}

export interface WardrobeStats {
  ownedCount: number;
  totalSpent: number;
  totalWears: number;
  averageCostPerWear: number | null;
  neverWornCount: number;
  mostWorn: PieceStat[];
  bestValue: PieceStat[];
  toAmortize: PieceStat[];
}
