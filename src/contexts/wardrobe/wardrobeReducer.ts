import {
  DEFAULT_STORAGE_LOCATION,
  OwnershipStatus,
  StorageLocation,
} from '../../constants/wardrobe';
import type { Piece } from '../../types/piece';
import type { WardrobeItem } from '../../types/wardrobe';
import { findWardrobeItem, toPieceSnapshot } from '../../utils/wardrobe';

export enum WardrobeActionType {
  PieceSaved = 'pieceSaved',
  PieceRemoved = 'pieceRemoved',
  LocationChanged = 'locationChanged',
}

export type WardrobeAction =
  | { type: WardrobeActionType.PieceSaved; piece: Piece; status: OwnershipStatus }
  | { type: WardrobeActionType.PieceRemoved; pieceId: number }
  | { type: WardrobeActionType.LocationChanged; pieceId: number; location: StorageLocation };

type WardrobeItemChanges = Partial<Pick<WardrobeItem, 'status' | 'location'>>;

function updateItem(
  items: readonly WardrobeItem[],
  pieceId: number,
  changes: WardrobeItemChanges,
): WardrobeItem[] {
  return items.map((item) => (item.piece.id === pieceId ? { ...item, ...changes } : item));
}

function createItem(piece: Piece, status: OwnershipStatus): WardrobeItem {
  return { piece: toPieceSnapshot(piece), status, location: DEFAULT_STORAGE_LOCATION };
}

function savePiece(
  items: readonly WardrobeItem[],
  piece: Piece,
  status: OwnershipStatus,
): WardrobeItem[] {
  return findWardrobeItem(items, piece.id)
    ? updateItem(items, piece.id, { status })
    : [...items, createItem(piece, status)];
}

export function wardrobeReducer(items: WardrobeItem[], action: WardrobeAction): WardrobeItem[] {
  switch (action.type) {
    case WardrobeActionType.PieceSaved:
      return savePiece(items, action.piece, action.status);
    case WardrobeActionType.PieceRemoved:
      return items.filter((item) => item.piece.id !== action.pieceId);
    case WardrobeActionType.LocationChanged:
      return updateItem(items, action.pieceId, { location: action.location });
  }
}
