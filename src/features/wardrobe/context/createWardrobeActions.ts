import type { Dispatch } from 'react';
import { toIsoDate } from '../utils/wornDates';
import type { WardrobeActions } from './WardrobeContext';
import { WardrobeActionType, type WardrobeAction } from './wardrobeReducer';

export function createWardrobeActions(dispatch: Dispatch<WardrobeAction>): WardrobeActions {
  return {
    savePiece: (piece, status) => dispatch({ type: WardrobeActionType.PieceSaved, piece, status }),
    addItem: (item) => dispatch({ type: WardrobeActionType.ItemAdded, item }),
    updateItem: (item) => dispatch({ type: WardrobeActionType.ItemUpdated, item }),
    removePiece: (pieceId) =>
      dispatch({ type: WardrobeActionType.PieceRemoved, pieceId, date: toIsoDate(new Date()) }),
    restorePiece: (pieceId) => dispatch({ type: WardrobeActionType.PieceRestored, pieceId }),
    archivePiece: (pieceId, reason) =>
      dispatch({
        type: WardrobeActionType.PieceArchived,
        pieceId,
        reason,
        date: toIsoDate(new Date()),
      }),
    unarchivePiece: (pieceId) => dispatch({ type: WardrobeActionType.PieceUnarchived, pieceId }),
    emptyTrash: () => dispatch({ type: WardrobeActionType.TrashEmptied }),
    markPiecesWorn: (pieceIds, date) =>
      dispatch({ type: WardrobeActionType.PiecesWorn, pieceIds, date }),
    replaceWardrobe: (state) => dispatch({ type: WardrobeActionType.StateReplaced, state }),
  };
}
