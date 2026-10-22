import { describe, expect, it } from 'vitest';
import type { WornEntry } from '../types/wornLog';
import { WornLogActionType, wornLogReducer } from './wornLogReducer';

const FIRST: WornEntry = { id: 'a', date: '2025-03-01', outfitId: 'o1' };
const SECOND: WornEntry = { id: 'b', date: '2025-03-02', outfitId: 'o1' };

describe('wornLogReducer', () => {
  it('ajoute une entrée en premier', () => {
    const next = wornLogReducer([FIRST], { type: WornLogActionType.EntryAdded, entry: SECOND });
    expect(next).toEqual([SECOND, FIRST]);
  });

  it('supprime une entrée', () => {
    const next = wornLogReducer([FIRST, SECOND], {
      type: WornLogActionType.EntryDeleted,
      entryId: 'a',
    });
    expect(next).toEqual([SECOND]);
  });
});
