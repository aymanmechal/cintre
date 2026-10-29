import type { ArchiveReason, Availability, OwnershipStatus } from '../constants/wardrobe';
import type { Piece } from '../../../shared/pieces/types/piece';

export interface WardrobeItem {
  piece: Piece;
  status: OwnershipStatus;
  availability: Availability;
  lastWornOn: string | null;
}

export interface TrashedItem {
  item: WardrobeItem;
  deletedOn: string;
}

export interface ArchivedItem {
  item: WardrobeItem;
  reason: ArchiveReason;
  archivedOn: string;
}

export interface WardrobeState {
  items: WardrobeItem[];
  trash: TrashedItem[];
  archive: ArchivedItem[];
}
