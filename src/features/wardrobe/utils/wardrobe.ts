import {
  DEFAULT_STORAGE_LOCATION,
  OWNERSHIP_STATUSES,
  OwnershipStatus,
  STORAGE_LOCATIONS,
  type StorageLocation,
} from '../constants/wardrobe';
import type { Piece } from '../../../shared/pieces/types/piece';
import type { WardrobeItem } from '../types/wardrobe';

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

export function countItemsByStatus(
  items: readonly WardrobeItem[],
  status: OwnershipStatus,
): number {
  return selectItemsByStatus(items, status).length;
}

export function selectItemsByStatus(
  items: readonly WardrobeItem[],
  status: OwnershipStatus,
): WardrobeItem[] {
  return items.filter((item) => item.status === status);
}

export function toOwnershipStatus(value: string): OwnershipStatus {
  return OWNERSHIP_STATUSES.find((status) => status === value) ?? OwnershipStatus.Owned;
}

export function toStorageLocation(value: string): StorageLocation {
  return STORAGE_LOCATIONS.find((location) => location === value) ?? DEFAULT_STORAGE_LOCATION;
}
