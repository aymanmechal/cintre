import type { OwnershipStatus, StorageLocation } from '../constants/wardrobe';
import type { Piece } from '../../../shared/pieces/types/piece';

export interface WardrobeItem {
  piece: Piece;
  status: OwnershipStatus;
  location: StorageLocation;
  lastWornOn: string | null;
}
