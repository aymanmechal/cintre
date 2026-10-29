import {
  AVAILABILITIES,
  Availability,
  OWNERSHIP_STATUSES,
  OwnershipStatus,
} from '../constants/wardrobe';
import type { Piece } from '../../../shared/pieces/types/piece';
import type { WardrobeItem } from '../types/wardrobe';

export function toPieceSnapshot(piece: Piece): Piece {
  const { id, title, brand, pieceType, price, thumbnail } = piece;
  const {
    photoId,
    extraPhotoIds,
    color,
    secondaryColor,
    season,
    size,
    material,
    boughtOn,
    productUrl,
    isFavorite,
    tags,
  } = piece;
  return {
    id,
    title,
    brand,
    pieceType,
    price,
    thumbnail,
    photoId,
    extraPhotoIds,
    color,
    secondaryColor,
    season,
    size,
    material,
    boughtOn,
    productUrl,
    isFavorite,
    tags,
  };
}

export function collectTags(items: readonly WardrobeItem[]): string[] {
  const tags = new Set(items.flatMap((item) => item.piece.tags));
  return [...tags].toSorted((first, second) => first.localeCompare(second, 'fr'));
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

export function toAvailability(value: string): Availability {
  return AVAILABILITIES.find((availability) => availability === value) ?? Availability.Available;
}
