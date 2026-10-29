import { Availability, OwnershipStatus, type ArchiveReason } from '../constants/wardrobe';
import type { Piece } from '../../../shared/pieces/types/piece';
import type { TrashedItem, WardrobeItem, WardrobeState } from '../types/wardrobe';
import { findWardrobeItem, toPieceSnapshot } from '../utils/wardrobe';
import { isNewerWornDate } from '../utils/wornDates';

export enum WardrobeActionType {
  PieceSaved = 'pieceSaved',
  ItemAdded = 'itemAdded',
  ItemUpdated = 'itemUpdated',
  PieceRemoved = 'pieceRemoved',
  PieceRestored = 'pieceRestored',
  PieceArchived = 'pieceArchived',
  PieceUnarchived = 'pieceUnarchived',
  TrashEmptied = 'trashEmptied',
  PiecesWorn = 'piecesWorn',
  StateReplaced = 'stateReplaced',
}

export type WardrobeAction =
  | { type: WardrobeActionType.PieceSaved; piece: Piece; status: OwnershipStatus }
  | { type: WardrobeActionType.ItemAdded; item: WardrobeItem }
  | { type: WardrobeActionType.ItemUpdated; item: WardrobeItem }
  | { type: WardrobeActionType.PieceRemoved; pieceId: number; date: string }
  | { type: WardrobeActionType.PieceRestored; pieceId: number }
  | {
      type: WardrobeActionType.PieceArchived;
      pieceId: number;
      reason: ArchiveReason;
      date: string;
    }
  | { type: WardrobeActionType.PieceUnarchived; pieceId: number }
  | { type: WardrobeActionType.TrashEmptied }
  | { type: WardrobeActionType.PiecesWorn; pieceIds: readonly number[]; date: string }
  | { type: WardrobeActionType.StateReplaced; state: WardrobeState };

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
    availability: Availability.Available,
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

function moveToTrash(state: WardrobeState, pieceId: number, date: string): WardrobeState {
  const item = findWardrobeItem(state.items, pieceId);
  if (!item) return state;
  const trashedItem: TrashedItem = { item, deletedOn: date };
  return {
    ...state,
    items: state.items.filter((existing) => existing !== item),
    trash: [trashedItem, ...state.trash],
  };
}

function restoreFromTrash(state: WardrobeState, pieceId: number): WardrobeState {
  const trashedItem = state.trash.find(({ item }) => item.piece.id === pieceId);
  if (!trashedItem) return state;
  return {
    ...state,
    items: addItem(state.items, trashedItem.item),
    trash: state.trash.filter((existing) => existing !== trashedItem),
  };
}

function archivePiece(
  state: WardrobeState,
  pieceId: number,
  reason: ArchiveReason,
  date: string,
): WardrobeState {
  const item = findWardrobeItem(state.items, pieceId);
  if (!item) return state;
  return {
    ...state,
    items: state.items.filter((existing) => existing !== item),
    archive: [{ item, reason, archivedOn: date }, ...state.archive],
  };
}

function unarchivePiece(state: WardrobeState, pieceId: number): WardrobeState {
  const archivedItem = state.archive.find(({ item }) => item.piece.id === pieceId);
  if (!archivedItem) return state;
  return {
    ...state,
    items: addItem(state.items, archivedItem.item),
    archive: state.archive.filter((existing) => existing !== archivedItem),
  };
}

function markPiecesWorn(
  items: WardrobeItem[],
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
  return updatedItems.some((item, index) => item !== items[index]) ? updatedItems : items;
}

function withItems(state: WardrobeState, items: WardrobeItem[]): WardrobeState {
  return items === state.items ? state : { ...state, items };
}

export function wardrobeReducer(state: WardrobeState, action: WardrobeAction): WardrobeState {
  switch (action.type) {
    case WardrobeActionType.PieceSaved:
      return withItems(state, savePiece(state.items, action.piece, action.status));
    case WardrobeActionType.ItemAdded:
      return withItems(state, addItem(state.items, action.item));
    case WardrobeActionType.ItemUpdated:
      return withItems(state, replaceItem(state.items, action.item));
    case WardrobeActionType.PieceRemoved:
      return moveToTrash(state, action.pieceId, action.date);
    case WardrobeActionType.PieceRestored:
      return restoreFromTrash(state, action.pieceId);
    case WardrobeActionType.PieceArchived:
      return archivePiece(state, action.pieceId, action.reason, action.date);
    case WardrobeActionType.PieceUnarchived:
      return unarchivePiece(state, action.pieceId);
    case WardrobeActionType.TrashEmptied:
      return { ...state, trash: [] };
    case WardrobeActionType.PiecesWorn:
      return withItems(state, markPiecesWorn(state.items, action.pieceIds, action.date));
    case WardrobeActionType.StateReplaced:
      return action.state;
  }
}
