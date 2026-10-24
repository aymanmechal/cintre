import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import {
  ARCHIVE_STORAGE_KEY,
  TRASH_STORAGE_KEY,
  WARDROBE_STORAGE_KEY,
} from '../constants/wardrobe';
import { loadWardrobeState } from '../utils/wardrobeState';
import { saveArchive, saveTrash, saveWardrobe } from '../utils/wardrobeStorage';
import { createWardrobeActions } from './createWardrobeActions';
import { WardrobeContext } from './WardrobeContext';
import { wardrobeReducer } from './wardrobeReducer';

interface WardrobeProviderProps {
  children: ReactNode;
}

export function WardrobeProvider({ children }: WardrobeProviderProps) {
  const [state, dispatch] = useReducer(wardrobeReducer, undefined, () =>
    loadWardrobeState(new Date()),
  );

  useEffect(() => {
    saveWardrobe(WARDROBE_STORAGE_KEY, state.items);
  }, [state.items]);

  useEffect(() => {
    saveArchive(ARCHIVE_STORAGE_KEY, state.archive);
  }, [state.archive]);

  useEffect(() => {
    saveTrash(TRASH_STORAGE_KEY, state.trash);
  }, [state.trash]);

  const actions = useMemo(() => createWardrobeActions(dispatch), []);
  const value = useMemo(() => ({ ...state, ...actions }), [state, actions]);

  return <WardrobeContext value={value}>{children}</WardrobeContext>;
}
