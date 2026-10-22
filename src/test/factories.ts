import { OwnershipStatus, StorageLocation } from '../features/wardrobe/constants/wardrobe';
import type { WardrobeItem } from '../features/wardrobe/types/wardrobe';
import type { Outfit } from '../features/outfits/types/outfit';
import { PieceType } from '../shared/pieces/constants/categories';
import type { Piece } from '../shared/pieces/types/piece';

type ItemOverrides = Partial<Omit<WardrobeItem, 'piece'>>;

export function makePiece(overrides: Partial<Piece> = {}): Piece {
  return {
    id: 1,
    title: 'Chemise en lin',
    brand: 'Norse Projects',
    pieceType: PieceType.Shirts,
    price: 100,
    rating: 4,
    stock: 5,
    thumbnail: 'https://images.test/piece.png',
    ...overrides,
  };
}

export function makeWardrobeItem(
  pieceOverrides: Partial<Piece> = {},
  itemOverrides: ItemOverrides = {},
): WardrobeItem {
  return {
    piece: makePiece(pieceOverrides),
    status: OwnershipStatus.Owned,
    location: StorageLocation.Wardrobe,
    lastWornOn: null,
    ...itemOverrides,
  };
}

export function makeOutfit(overrides: Partial<Outfit> = {}): Outfit {
  return { id: 'outfit-1', name: 'Tenue test', pieceIds: [1, 2], ...overrides };
}
