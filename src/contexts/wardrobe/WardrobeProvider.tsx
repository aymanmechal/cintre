import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { WARDROBE_STORAGE_KEY } from '../../constants/wardrobe';
import { loadStoredWardrobe, saveWardrobe } from '../../utils/wardrobeStorage';
import { createWardrobeActions } from './createWardrobeActions';
import { WardrobeContext } from './WardrobeContext';
import { wardrobeReducer } from './wardrobeReducer';

interface WardrobeProviderProps {
  children: ReactNode;
}

export function WardrobeProvider({ children }: WardrobeProviderProps) {
  const [items, dispatch] = useReducer(wardrobeReducer, WARDROBE_STORAGE_KEY, loadStoredWardrobe);

  useEffect(() => {
    saveWardrobe(WARDROBE_STORAGE_KEY, items);
  }, [items]);

  const actions = useMemo(() => createWardrobeActions(dispatch), []);
  const value = useMemo(() => ({ items, ...actions }), [items, actions]);

  return <WardrobeContext value={value}>{children}</WardrobeContext>;
}
