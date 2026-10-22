import { createContext } from 'react';
import type { WornEntry } from '../../types/wornLog';

export interface WornLogActions {
  addEntry: (entry: WornEntry) => void;
  deleteEntry: (entryId: string) => void;
}

export interface WornLogValue extends WornLogActions {
  entries: WornEntry[];
}

export const WornLogContext = createContext<WornLogValue | null>(null);
