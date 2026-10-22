import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { WORN_LOG_STORAGE_KEY } from '../constants/calendar';
import { loadStoredWornLog, saveWornLog } from '../utils/wornLogStorage';
import { createWornLogActions } from './createWornLogActions';
import { WornLogContext } from './WornLogContext';
import { wornLogReducer } from './wornLogReducer';

interface WornLogProviderProps {
  children: ReactNode;
}

export function WornLogProvider({ children }: WornLogProviderProps) {
  const [entries, dispatch] = useReducer(wornLogReducer, WORN_LOG_STORAGE_KEY, loadStoredWornLog);

  useEffect(() => {
    saveWornLog(WORN_LOG_STORAGE_KEY, entries);
  }, [entries]);

  const actions = useMemo(() => createWornLogActions(dispatch), []);
  const value = useMemo(() => ({ entries, ...actions }), [entries, actions]);

  return <WornLogContext value={value}>{children}</WornLogContext>;
}
