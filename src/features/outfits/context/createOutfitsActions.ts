import type { Dispatch } from 'react';
import type { OutfitsActions } from './OutfitsContext';
import { OutfitsActionType, type OutfitsAction } from './outfitsReducer';

export function createOutfitsActions(dispatch: Dispatch<OutfitsAction>): OutfitsActions {
  return {
    createOutfit: (outfit) => dispatch({ type: OutfitsActionType.OutfitCreated, outfit }),
    deleteOutfit: (outfitId) => dispatch({ type: OutfitsActionType.OutfitDeleted, outfitId }),
  };
}
