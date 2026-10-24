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

  it('complète les anciennes tenues sans note ni score', () => {
    localStorage.setItem(KEY, JSON.stringify([{ id: 'a', name: 'Ancienne', pieceIds: [1, 2] }]));
    expect(loadStoredOutfits(KEY)).toEqual([
      { id: 'a', name: 'Ancienne', pieceIds: [1, 2], note: '', score: 0, occasion: null },
    ]);
  });

  it("garde l'occasion valide et ignore une occasion inconnue", () => {
    localStorage.setItem(
      KEY,
      JSON.stringify([
        { id: 'a', name: 'A', pieceIds: [1], occasion: 'mariage' },
        { id: 'b', name: 'B', pieceIds: [1], occasion: 'bal' },
      ]),
    );
    expect(loadStoredOutfits(KEY).map((outfit) => outfit.occasion)).toEqual(['mariage', null]);
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
