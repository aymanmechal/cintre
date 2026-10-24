import type { WornEntry } from '../types/wornLog';

export enum WornLogActionType {
  EntryAdded = 'entryAdded',
  EntryDeleted = 'entryDeleted',
  EntriesReplaced = 'entriesReplaced',
}

export type WornLogAction =
  | { type: WornLogActionType.EntryAdded; entry: WornEntry }
  | { type: WornLogActionType.EntryDeleted; entryId: string }
  | { type: WornLogActionType.EntriesReplaced; entries: WornEntry[] };

export function wornLogReducer(entries: WornEntry[], action: WornLogAction): WornEntry[] {
  switch (action.type) {
    case WornLogActionType.EntryAdded:
      return [action.entry, ...entries];
    case WornLogActionType.EntryDeleted:
      return entries.filter((entry) => entry.id !== action.entryId);
    case WornLogActionType.EntriesReplaced:
      return action.entries;
  }
}
