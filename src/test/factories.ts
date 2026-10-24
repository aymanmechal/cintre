import {
  Availability,
  OwnershipStatus,
  StorageLocation,
} from '../features/wardrobe/constants/wardrobe';
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
    thumbnail: 'https://images.test/piece.png',
    photoId: null,
    extraPhotoIds: [],
    color: null,
    season: null,
    size: '',
    material: '',
    boughtOn: null,
    productUrl: '',
    isFavorite: false,
    tags: [],
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
    availability: Availability.Available,
    lastWornOn: null,
    ...itemOverrides,
  };
}

export function makeOutfit(overrides: Partial<Outfit> = {}): Outfit {
  return {
    id: 'outfit-1',
    name: 'Tenue test',
    pieceIds: [1, 2],
    note: '',
    score: 0,
    occasion: null,
    ...overrides,
  };
}
