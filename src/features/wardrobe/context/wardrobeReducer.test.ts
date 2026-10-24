import { describe, expect, it } from 'vitest';
import { makePiece, makeWardrobeItem } from '../../../test/factories';
import { ArchiveReason, OwnershipStatus } from '../constants/wardrobe';
import type { WardrobeItem, WardrobeState } from '../types/wardrobe';
import { WardrobeActionType, wardrobeReducer, type WardrobeAction } from './wardrobeReducer';

function stateWith(items: WardrobeItem[]): WardrobeState {
  return { items, trash: [], archive: [] };
}

function reduceItems(items: WardrobeItem[], action: WardrobeAction): WardrobeItem[] {
  return wardrobeReducer(stateWith(items), action).items;
}

describe('wardrobeReducer', () => {
  it('ajoute une pièce avec le statut choisi', () => {
    const next = reduceItems([], {
      type: WardrobeActionType.PieceSaved,
      piece: makePiece({ id: 9 }),
      status: OwnershipStatus.Wanted,
    });
    expect(next).toHaveLength(1);
    expect(next[0]).toMatchObject({ status: OwnershipStatus.Wanted, lastWornOn: null });
  });

  it("change seulement le statut d'une pièce déjà présente", () => {
    const items = [makeWardrobeItem({ id: 9 }, { lastWornOn: '2025-01-01' })];
    const next = reduceItems(items, {
      type: WardrobeActionType.PieceSaved,
      piece: makePiece({ id: 9 }),
      status: OwnershipStatus.Wanted,
    });
    expect(next).toHaveLength(1);
    expect(next[0]).toMatchObject({ status: OwnershipStatus.Wanted, lastWornOn: '2025-01-01' });
  });

  it('remplace un élément existant quand on en ajoute un avec le même id', () => {
    const next = reduceItems([makeWardrobeItem({ id: 1, title: 'Ancien' })], {
      type: WardrobeActionType.ItemAdded,
      item: makeWardrobeItem({ id: 1, title: 'Nouveau' }),
    });
    expect(next.map((item) => item.piece.title)).toEqual(['Nouveau']);
  });

  it('met à jour un élément', () => {
    const next = reduceItems([makeWardrobeItem({ id: 1, price: 10 })], {
      type: WardrobeActionType.ItemUpdated,
      item: makeWardrobeItem({ id: 1, price: 99 }),
    });
    expect(next[0].piece.price).toBe(99);
  });

  it('remplace tout l’état (import d’une sauvegarde)', () => {
    const state = stateWith([makeWardrobeItem({ id: 4 })]);
    expect(wardrobeReducer(stateWith([]), { type: WardrobeActionType.StateReplaced, state })).toBe(
      state,
    );
  });
});

describe('wardrobeReducer : corbeille', () => {
  const ITEMS = [makeWardrobeItem({ id: 1 }), makeWardrobeItem({ id: 2 })];

  function remove(state: WardrobeState, pieceId: number): WardrobeState {
    return wardrobeReducer(state, {
      type: WardrobeActionType.PieceRemoved,
      pieceId,
      date: '2025-03-10',
    });
  }

  it('met la pièce retirée dans la corbeille avec la date', () => {
    const next = remove(stateWith(ITEMS), 1);
    expect(next.items.map((item) => item.piece.id)).toEqual([2]);
    expect(next.trash).toEqual([{ item: ITEMS[0], deletedOn: '2025-03-10' }]);
  });

  it('restaure une pièce de la corbeille telle quelle', () => {
    const removed = remove(stateWith(ITEMS), 1);
    const next = wardrobeReducer(removed, { type: WardrobeActionType.PieceRestored, pieceId: 1 });
    expect(next.items).toContainEqual(ITEMS[0]);
    expect(next.trash).toEqual([]);
  });

  it('vide la corbeille', () => {
    const removed = remove(stateWith(ITEMS), 1);
    expect(wardrobeReducer(removed, { type: WardrobeActionType.TrashEmptied }).trash).toEqual([]);
  });

  it('ne change rien pour une pièce inconnue', () => {
    const state = stateWith(ITEMS);
    expect(remove(state, 99)).toBe(state);
  });
});

describe('wardrobeReducer : archives', () => {
  const ITEMS = [makeWardrobeItem({ id: 1 }), makeWardrobeItem({ id: 2 })];

  it('archive une pièce avec sa raison et la date', () => {
    const next = wardrobeReducer(stateWith(ITEMS), {
      type: WardrobeActionType.PieceArchived,
      pieceId: 1,
      reason: ArchiveReason.Sold,
      date: '2025-03-10',
    });
    expect(next.items.map((item) => item.piece.id)).toEqual([2]);
    expect(next.archive).toEqual([
      { item: ITEMS[0], reason: ArchiveReason.Sold, archivedOn: '2025-03-10' },
    ]);
  });

  it('remet une pièce archivée dans la garde-robe', () => {
    const archived = wardrobeReducer(stateWith(ITEMS), {
      type: WardrobeActionType.PieceArchived,
      pieceId: 1,
      reason: ArchiveReason.Given,
      date: '2025-03-10',
    });
    const next = wardrobeReducer(archived, {
      type: WardrobeActionType.PieceUnarchived,
      pieceId: 1,
    });
    expect(next.items).toContainEqual(ITEMS[0]);
    expect(next.archive).toEqual([]);
  });
});

describe('wardrobeReducer : pièces portées', () => {
  function wear(items: WardrobeItem[], pieceIds: number[], date: string): WardrobeItem[] {
    return reduceItems(items, { type: WardrobeActionType.PiecesWorn, pieceIds, date });
  }

  it('met la date sur les pièces demandées seulement', () => {
    const next = wear(
      [makeWardrobeItem({ id: 1 }), makeWardrobeItem({ id: 2 })],
      [1],
      '2025-03-10',
    );
    expect(next.map((item) => item.lastWornOn)).toEqual(['2025-03-10', null]);
  });

  it('ne remplace pas une date plus récente par une plus ancienne', () => {
    const items = [makeWardrobeItem({ id: 1 }, { lastWornOn: '2025-03-10' })];
    expect(wear(items, [1], '2025-03-01')[0].lastWornOn).toBe('2025-03-10');
  });

  it("ignore les envies, qu'on ne possède pas", () => {
    const items = [makeWardrobeItem({ id: 1 }, { status: OwnershipStatus.Wanted })];
    expect(wear(items, [1], '2025-03-10')[0].lastWornOn).toBeNull();
  });

  it('renvoie le même état quand rien ne change (pas de rendu inutile)', () => {
    const state = stateWith([makeWardrobeItem({ id: 1 }, { lastWornOn: '2025-03-10' })]);
    const next = wardrobeReducer(state, {
      type: WardrobeActionType.PiecesWorn,
      pieceIds: [1],
      date: '2025-03-10',
    });
    expect(next).toBe(state);
  });
});
