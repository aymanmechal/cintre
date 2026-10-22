import { describe, expect, it } from 'vitest';
import type { WornEntry } from '../types/wornLog';
import { loadStoredWornLog, saveWornLog } from './wornLogStorage';

const KEY = 'test.wornlog';
const ENTRY: WornEntry = { id: 'a', date: '2025-03-01', outfitId: 'o1' };

describe('wornLogStorage', () => {
  it('relit le journal sauvegardé', () => {
    saveWornLog(KEY, [ENTRY]);
    expect(loadStoredWornLog(KEY)).toEqual([ENTRY]);
  });

  it("renvoie une liste vide quand rien n'est stocké", () => {
    expect(loadStoredWornLog(KEY)).toEqual([]);
  });

  it('ignore les entrées invalides', () => {
    localStorage.setItem(KEY, JSON.stringify([ENTRY, { id: 1 }, 'texte']));
    expect(loadStoredWornLog(KEY)).toEqual([ENTRY]);
  });
});
