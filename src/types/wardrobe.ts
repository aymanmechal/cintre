import type { OwnershipStatus, StorageLocation } from '../constants/wardrobe';
import type { Piece } from './piece';

export interface WardrobeItem {
  piece: Piece;
  status: OwnershipStatus;
  location: StorageLocation;
  lastWornOn: string | null;
}
