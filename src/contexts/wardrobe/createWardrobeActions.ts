import type { Dispatch } from 'react';
import type { WardrobeActions } from './WardrobeContext';
import { WardrobeActionType, type WardrobeAction } from './wardrobeReducer';

export function createWardrobeActions(dispatch: Dispatch<WardrobeAction>): WardrobeActions {
  return {
    savePiece: (piece, status) => dispatch({ type: WardrobeActionType.PieceSaved, piece, status }),
    addItem: (item) => dispatch({ type: WardrobeActionType.ItemAdded, item }),
    removePiece: (pieceId) => dispatch({ type: WardrobeActionType.PieceRemoved, pieceId }),
    changeLocation: (pieceId, location) =>
      dispatch({ type: WardrobeActionType.LocationChanged, pieceId, location }),
  };
}
