import type { Dispatch } from 'react';
import type { WornLogActions } from './WornLogContext';
import { WornLogActionType, type WornLogAction } from './wornLogReducer';

export function createWornLogActions(dispatch: Dispatch<WornLogAction>): WornLogActions {
  return {
    addEntry: (entry) => dispatch({ type: WornLogActionType.EntryAdded, entry }),
    deleteEntry: (entryId) => dispatch({ type: WornLogActionType.EntryDeleted, entryId }),
  };
}
