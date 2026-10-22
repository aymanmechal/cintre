import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { loadStoredWardrobe, saveWardrobe } from './wardrobeStorage';

const KEY = 'test.wardrobe';

describe('wardrobeStorage', () => {
  it('relit ce qui a été sauvegardé', () => {
    const items = [makeWardrobeItem({ id: 5 }, { lastWornOn: '2025-03-01' })];
    saveWardrobe(KEY, items);
    expect(loadStoredWardrobe(KEY)).toEqual(items);
  });

  it("renvoie une liste vide quand rien n'est stocké", () => {
    expect(loadStoredWardrobe(KEY)).toEqual([]);
  });

  it('ignore les éléments invalides', () => {
    saveWardrobe(KEY, [makeWardrobeItem({ id: 1 }), { n: 'importe quoi' }, null] as never);
    expect(loadStoredWardrobe(KEY)).toHaveLength(1);
  });

  it("ajoute lastWornOn: null aux anciennes données qui ne l'avaient pas", () => {
    const { lastWornOn, ...oldItem } = makeWardrobeItem({ id: 1 });
    expect(lastWornOn).toBeNull();
    localStorage.setItem(KEY, JSON.stringify([oldItem]));
    expect(loadStoredWardrobe(KEY)[0].lastWornOn).toBeNull();
  });

  it("renvoie une liste vide quand la valeur n'est pas un tableau", () => {
    localStorage.setItem(KEY, JSON.stringify({ a: 1 }));
    expect(loadStoredWardrobe(KEY)).toEqual([]);
  });
});
