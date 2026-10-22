import { describe, expect, it } from 'vitest';
import { makeOutfit } from '../../../test/factories';
import type { WornEntry } from '../types/wornLog';
import {
  createWornEntryId,
  findOutfit,
  selectEntriesOfDate,
  sortEntriesNewestFirst,
} from './wornLog';

const OLD: WornEntry = { id: 'a', date: '2025-03-01', outfitId: 'o1' };
const NEW: WornEntry = { id: 'b', date: '2025-03-20', outfitId: 'o2' };
const SAME_DAY: WornEntry = { id: 'c', date: '2025-03-20', outfitId: 'o1' };

describe('wornLog utils', () => {
  it('classe les entrées de la plus récente à la plus ancienne', () => {
    expect(sortEntriesNewestFirst([OLD, NEW])).toEqual([NEW, OLD]);
  });

  it("ne modifie pas la liste d'origine en triant", () => {
    const entries = [OLD, NEW];
    sortEntriesNewestFirst(entries);
    expect(entries).toEqual([OLD, NEW]);
  });

  it("garde les entrées d'un jour précis", () => {
    expect(selectEntriesOfDate([OLD, NEW, SAME_DAY], '2025-03-20')).toEqual([NEW, SAME_DAY]);
  });

  it('retrouve une tenue par son id', () => {
    const outfit = makeOutfit({ id: 'o1' });
    expect(findOutfit([outfit], 'o1')).toBe(outfit);
    expect(findOutfit([outfit], 'zzz')).toBeUndefined();
  });

  it('crée des identifiants uniques', () => {
    expect(createWornEntryId()).not.toBe(createWornEntryId());
  });
});
