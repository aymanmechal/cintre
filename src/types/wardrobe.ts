import type { OwnershipStatus, StorageLocation } from '../constants/wardrobe';
import type { Piece } from './piece';

export interface WardrobeItem {
  piece: Piece;
  status: OwnershipStatus;
  location: StorageLocation;
}

export interface LocationGroup {
  location: StorageLocation;
  items: WardrobeItem[];
}
