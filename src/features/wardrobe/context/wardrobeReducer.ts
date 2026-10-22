import { DEFAULT_STORAGE_LOCATION, OwnershipStatus } from '../constants/wardrobe';
import type { Piece } from '../../../shared/pieces/types/piece';
import type { WardrobeItem } from '../types/wardrobe';
import { findWardrobeItem, toPieceSnapshot } from '../utils/wardrobe';
import { isNewerWornDate } from '../utils/wornDates';

export enum WardrobeActionType {
  PieceSaved = 'pieceSaved',
  ItemAdded = 'itemAdded',
  ItemUpdated = 'itemUpdated',
  PieceRemoved = 'pieceRemoved',
  PiecesWorn = 'piecesWorn',
}

export type WardrobeAction =
  | { type: WardrobeActionType.PieceSaved; piece: Piece; status: OwnershipStatus }
  | { type: WardrobeActionType.ItemAdded; item: WardrobeItem }
  | { type: WardrobeActionType.ItemUpdated; item: WardrobeItem }
  | { type: WardrobeActionType.PieceRemoved; pieceId: number }
  | { type: WardrobeActionType.PiecesWorn; pieceIds: readonly number[]; date: string };

type WardrobeItemChanges = Partial<Pick<WardrobeItem, 'status'>>;

function changeItem(
  items: readonly WardrobeItem[],
  pieceId: number,
  changes: WardrobeItemChanges,
): WardrobeItem[] {
  return items.map((item) => (item.piece.id === pieceId ? { ...item, ...changes } : item));
}

function createItem(piece: Piece, status: OwnershipStatus): WardrobeItem {
  return {
    piece: toPieceSnapshot(piece),
    status,
    location: DEFAULT_STORAGE_LOCATION,
    lastWornOn: null,
  };
}

function savePiece(
  items: readonly WardrobeItem[],
  piece: Piece,
  status: OwnershipStatus,
): WardrobeItem[] {
  return findWardrobeItem(items, piece.id)
    ? changeItem(items, piece.id, { status })
    : [...items, createItem(piece, status)];
}

function addItem(items: readonly WardrobeItem[], item: WardrobeItem): WardrobeItem[] {
  return [...items.filter((existing) => existing.piece.id !== item.piece.id), item];
}

function replaceItem(items: readonly WardrobeItem[], updatedItem: WardrobeItem): WardrobeItem[] {
  return items.map((item) => (item.piece.id === updatedItem.piece.id ? updatedItem : item));
}

function markPiecesWorn(
  items: readonly WardrobeItem[],
  pieceIds: readonly number[],
  date: string,
): WardrobeItem[] {
  const updatedItems = items.map((item) =>
    pieceIds.includes(item.piece.id) &&
    item.status === OwnershipStatus.Owned &&
    isNewerWornDate(date, item.lastWornOn)
      ? { ...item, lastWornOn: date }
      : item,
  );
  return updatedItems.some((item, index) => item !== items[index]) ? updatedItems : [...items];
}

export function wardrobeReducer(items: WardrobeItem[], action: WardrobeAction): WardrobeItem[] {
  switch (action.type) {
    case WardrobeActionType.PieceSaved:
      return savePiece(items, action.piece, action.status);
    case WardrobeActionType.ItemAdded:
      return addItem(items, action.item);
    case WardrobeActionType.ItemUpdated:
      return replaceItem(items, action.item);
    case WardrobeActionType.PieceRemoved:
      return items.filter((item) => item.piece.id !== action.pieceId);
    case WardrobeActionType.PiecesWorn:
      return markPiecesWorn(items, action.pieceIds, action.date);
  }
}
