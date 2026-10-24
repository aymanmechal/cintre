import { describe, expect, it } from 'vitest';
import { Availability } from '../constants/wardrobe';
import { makeWardrobeItem } from '../../../test/factories';
import { loadStoredTrash, loadStoredWardrobe, saveTrash, saveWardrobe } from './wardrobeStorage';

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

  it('migre les anciennes pièces sans note ni stock', () => {
    const { piece, ...item } = makeWardrobeItem({ id: 1 });
    const oldPiece = {
      id: piece.id,
      title: piece.title,
      brand: piece.brand,
      pieceType: piece.pieceType,
      price: piece.price,
      rating: 4,
      stock: 2,
      thumbnail: piece.thumbnail,
    };
    localStorage.setItem(KEY, JSON.stringify([{ ...item, piece: oldPiece }]));
    expect(loadStoredWardrobe(KEY)[0].piece).toEqual(piece);
  });

  it('donne la disponibilité « disponible » aux anciennes pièces', () => {
    const { availability, ...oldItem } = makeWardrobeItem({ id: 1 });
    expect(availability).toBe(Availability.Available);
    localStorage.setItem(KEY, JSON.stringify([oldItem]));
    expect(loadStoredWardrobe(KEY)[0].availability).toBe(Availability.Available);
  });

  it("renvoie une liste vide quand la valeur n'est pas un tableau", () => {
    localStorage.setItem(KEY, JSON.stringify({ a: 1 }));
    expect(loadStoredWardrobe(KEY)).toEqual([]);
  });

  it('relit la corbeille et ignore les entrées invalides', () => {
    const trash = [{ item: makeWardrobeItem({ id: 3 }), deletedOn: '2025-03-01' }];
    saveTrash(KEY, [...trash, { item: null, deletedOn: 'x' }] as never);
    expect(loadStoredTrash(KEY)).toEqual(trash);
  });
});
