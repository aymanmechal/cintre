import { createContext } from 'react';
import type { OwnershipStatus, StorageLocation } from '../../constants/wardrobe';
import type { Piece } from '../../types/piece';
import type { WardrobeItem } from '../../types/wardrobe';

export interface WardrobeActions {
  savePiece: (piece: Piece, status: OwnershipStatus) => void;
  addItem: (item: WardrobeItem) => void;
  removePiece: (pieceId: number) => void;
  changeLocation: (pieceId: number, location: StorageLocation) => void;
}

export interface WardrobeValue extends WardrobeActions {
  items: WardrobeItem[];
}

export const WardrobeContext = createContext<WardrobeValue | null>(null);
