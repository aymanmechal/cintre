import { describe, expect, it } from 'vitest';
import { makeOutfit } from '../../../test/factories';
import { loadStoredOutfits, saveOutfits } from './outfitStorage';

const KEY = 'test.outfits';

describe('outfitStorage', () => {
  it('relit les tenues sauvegardées', () => {
    const outfits = [makeOutfit()];
    saveOutfits(KEY, outfits);
    expect(loadStoredOutfits(KEY)).toEqual(outfits);
  });

  it("renvoie une liste vide quand rien n'est stocké", () => {
    expect(loadStoredOutfits(KEY)).toEqual([]);
  });

  it('ignore les tenues mal formées', () => {
    localStorage.setItem(
      KEY,
      JSON.stringify([
        makeOutfit(),
        { id: 1, name: 'x', pieceIds: [] },
        { id: 'a', name: 'b', pieceIds: ['x'] },
      ]),
    );
    expect(loadStoredOutfits(KEY)).toHaveLength(1);
  });
});
