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

  it('relit sans erreur une ancienne pièce avec location et la réécrit sans', () => {
    const { piece, ...item } = makeWardrobeItem({ id: 1 });
    localStorage.setItem(KEY, JSON.stringify([{ ...item, piece, location: 'tiroir' }]));
    const [loaded] = loadStoredWardrobe(KEY);
    expect(loaded.piece.id).toBe(1);
    expect(loaded).not.toHaveProperty('location');
    saveWardrobe(KEY, [loaded]);
    expect(localStorage.getItem(KEY)).not.toContain('location');
  });

  it('relit une pièce avec une location inconnue ou absente', () => {
    const { piece, ...item } = makeWardrobeItem({ id: 1 });
    localStorage.setItem(
      KEY,
      JSON.stringify([
        { ...item, piece, location: 'cave' },
        { ...item, piece: { ...piece, id: 2 } },
        { ...item, piece: { ...piece, id: 3 }, location: 5 },
      ]),
    );
    expect(loadStoredWardrobe(KEY).map((stored) => stored.piece.id)).toEqual([1, 2, 3]);
  });

  it('transforme une ancienne couleur multicolore en aucune couleur', () => {
    const { piece, ...item } = makeWardrobeItem({ id: 1 });
    localStorage.setItem(
      KEY,
      JSON.stringify([{ ...item, piece: { ...piece, color: 'multicolore' } }]),
    );
    const [loaded] = loadStoredWardrobe(KEY);
    expect(loaded.piece.color).toBeNull();
    expect(loaded.piece.secondaryColor).toBeNull();
  });

  it('promeut une couleur secondaire sans principale à la lecture', () => {
    const { piece, ...item } = makeWardrobeItem({ id: 1 });
    const stored = { ...piece, color: null, secondaryColor: 'rouge' };
    localStorage.setItem(KEY, JSON.stringify([{ ...item, piece: stored }]));
    expect(loadStoredWardrobe(KEY)[0].piece).toMatchObject({
      color: 'rouge',
      secondaryColor: null,
    });
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
