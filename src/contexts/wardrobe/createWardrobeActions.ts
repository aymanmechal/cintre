import type { Dispatch } from 'react';
import type { WardrobeActions } from './WardrobeContext';
import { toIsoDate } from '../../utils/wornDates';
import { WardrobeActionType, type WardrobeAction } from './wardrobeReducer';

export function createWardrobeActions(dispatch: Dispatch<WardrobeAction>): WardrobeActions {
  return {
    savePiece: (piece, status) => dispatch({ type: WardrobeActionType.PieceSaved, piece, status }),
    addItem: (item) => dispatch({ type: WardrobeActionType.ItemAdded, item }),
    updateItem: (item) => dispatch({ type: WardrobeActionType.ItemUpdated, item }),
    removePiece: (pieceId) => dispatch({ type: WardrobeActionType.PieceRemoved, pieceId }),
    markWorn: (pieceId) =>
      dispatch({ type: WardrobeActionType.PieceWorn, pieceId, date: toIsoDate(new Date()) }),
    changeLocation: (pieceId, location) =>
      dispatch({ type: WardrobeActionType.LocationChanged, pieceId, location }),
  };
}
