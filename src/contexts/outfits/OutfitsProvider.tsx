import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { OUTFITS_STORAGE_KEY } from '../../constants/outfits';
import { loadStoredOutfits, saveOutfits } from '../../utils/outfitStorage';
import { createOutfitsActions } from './createOutfitsActions';
import { OutfitsContext } from './OutfitsContext';
import { outfitsReducer } from './outfitsReducer';

interface OutfitsProviderProps {
  children: ReactNode;
}

export function OutfitsProvider({ children }: OutfitsProviderProps) {
  const [outfits, dispatch] = useReducer(outfitsReducer, OUTFITS_STORAGE_KEY, loadStoredOutfits);

  useEffect(() => {
    saveOutfits(OUTFITS_STORAGE_KEY, outfits);
  }, [outfits]);

  const actions = useMemo(() => createOutfitsActions(dispatch), []);
  const value = useMemo(() => ({ outfits, ...actions }), [outfits, actions]);

  return <OutfitsContext value={value}>{children}</OutfitsContext>;
}
