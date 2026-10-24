import { createContext } from 'react';
import type { ArchiveReason, OwnershipStatus } from '../constants/wardrobe';
import type { Piece } from '../../../shared/pieces/types/piece';
import type { ArchivedItem, TrashedItem, WardrobeItem, WardrobeState } from '../types/wardrobe';

export interface WardrobeActions {
  savePiece: (piece: Piece, status: OwnershipStatus) => void;
  addItem: (item: WardrobeItem) => void;
  updateItem: (item: WardrobeItem) => void;
  removePiece: (pieceId: number) => void;
  restorePiece: (pieceId: number) => void;
  archivePiece: (pieceId: number, reason: ArchiveReason) => void;
  unarchivePiece: (pieceId: number) => void;
  emptyTrash: () => void;
  markPiecesWorn: (pieceIds: readonly number[], date: string) => void;
  replaceWardrobe: (state: WardrobeState) => void;
}

export interface WardrobeValue extends WardrobeActions {
  items: WardrobeItem[];
  trash: TrashedItem[];
  archive: ArchivedItem[];
}

export const WardrobeContext = createContext<WardrobeValue | null>(null);
