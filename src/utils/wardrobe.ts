import {
  DEFAULT_STORAGE_LOCATION,
  OWNERSHIP_STATUSES,
  OwnershipStatus,
  STORAGE_LOCATIONS,
  type StorageLocation,
} from '../constants/wardrobe';
import type { Piece } from '../types/piece';
import type { LocationGroup, WardrobeItem } from '../types/wardrobe';

export function toPieceSnapshot(piece: Piece): Piece {
  const { id, title, brand, pieceType, price, rating, stock, thumbnail } = piece;
  return { id, title, brand, pieceType, price, rating, stock, thumbnail };
}

export function findWardrobeItem(
  items: readonly WardrobeItem[],
  pieceId: number,
): WardrobeItem | undefined {
  return items.find((item) => item.piece.id === pieceId);
}

export function selectItemsByStatus(
  items: readonly WardrobeItem[],
  status: OwnershipStatus,
): WardrobeItem[] {
  return items.filter((item) => item.status === status);
}

export function groupOwnedItemsByLocation(items: readonly WardrobeItem[]): LocationGroup[] {
  const ownedItems = selectItemsByStatus(items, OwnershipStatus.Owned);
  return STORAGE_LOCATIONS.map((location) => ({
    location,
    items: ownedItems.filter((item) => item.location === location),
  })).filter((group) => group.items.length > 0);
}

export function toOwnershipStatus(value: string): OwnershipStatus {
  return OWNERSHIP_STATUSES.find((status) => status === value) ?? OwnershipStatus.Owned;
}

export function toStorageLocation(value: string): StorageLocation {
  return STORAGE_LOCATIONS.find((location) => location === value) ?? DEFAULT_STORAGE_LOCATION;
}
