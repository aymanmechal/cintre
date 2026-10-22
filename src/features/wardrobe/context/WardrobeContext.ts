import { createContext } from 'react';
import type { OwnershipStatus } from '../constants/wardrobe';
import type { Piece } from '../../../shared/pieces/types/piece';
import type { WardrobeItem } from '../types/wardrobe';

export interface WardrobeActions {
  savePiece: (piece: Piece, status: OwnershipStatus) => void;
  addItem: (item: WardrobeItem) => void;
  updateItem: (item: WardrobeItem) => void;
  removePiece: (pieceId: number) => void;
  markWorn: (pieceId: number) => void;
  markPiecesWorn: (pieceIds: readonly number[], date: string) => void;
}

export interface WardrobeValue extends WardrobeActions {
  items: WardrobeItem[];
}

export const WardrobeContext = createContext<WardrobeValue | null>(null);
