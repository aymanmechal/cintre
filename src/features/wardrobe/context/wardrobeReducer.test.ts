import { describe, expect, it } from 'vitest';
import { makePiece, makeWardrobeItem } from '../../../test/factories';
import { OwnershipStatus } from '../constants/wardrobe';
import type { WardrobeItem } from '../types/wardrobe';
import { WardrobeActionType, wardrobeReducer } from './wardrobeReducer';

describe('wardrobeReducer', () => {
  it('ajoute une pièce du catalogue avec le statut choisi', () => {
    const next = wardrobeReducer([], {
      type: WardrobeActionType.PieceSaved,
      piece: makePiece({ id: 9 }),
      status: OwnershipStatus.Wanted,
    });
    expect(next).toHaveLength(1);
    expect(next[0]).toMatchObject({ status: OwnershipStatus.Wanted, lastWornOn: null });
  });

  it("change seulement le statut d'une pièce déjà présente", () => {
    const items = [makeWardrobeItem({ id: 9 }, { lastWornOn: '2025-01-01' })];
    const next = wardrobeReducer(items, {
      type: WardrobeActionType.PieceSaved,
      piece: makePiece({ id: 9 }),
      status: OwnershipStatus.Wanted,
    });
    expect(next).toHaveLength(1);
    expect(next[0]).toMatchObject({ status: OwnershipStatus.Wanted, lastWornOn: '2025-01-01' });
  });

  it('remplace un élément existant quand on en ajoute un avec le même id', () => {
    const next = wardrobeReducer([makeWardrobeItem({ id: 1, title: 'Ancien' })], {
      type: WardrobeActionType.ItemAdded,
      item: makeWardrobeItem({ id: 1, title: 'Nouveau' }),
    });
    expect(next.map((item) => item.piece.title)).toEqual(['Nouveau']);
  });

  it('met à jour un élément', () => {
    const next = wardrobeReducer([makeWardrobeItem({ id: 1, price: 10 })], {
      type: WardrobeActionType.ItemUpdated,
      item: makeWardrobeItem({ id: 1, price: 99 }),
    });
    expect(next[0].piece.price).toBe(99);
  });

  it('retire une pièce', () => {
    const next = wardrobeReducer([makeWardrobeItem({ id: 1 }), makeWardrobeItem({ id: 2 })], {
      type: WardrobeActionType.PieceRemoved,
      pieceId: 1,
    });
    expect(next.map((item) => item.piece.id)).toEqual([2]);
  });
});

describe('wardrobeReducer : pièces portées', () => {
  function wear(items: WardrobeItem[], pieceIds: number[], date: string): WardrobeItem[] {
    return wardrobeReducer(items, { type: WardrobeActionType.PiecesWorn, pieceIds, date });
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

  it('renvoie la même liste quand rien ne change (pas de rendu inutile)', () => {
    const items = [makeWardrobeItem({ id: 1 }, { lastWornOn: '2025-03-10' })];
    expect(wear(items, [1], '2025-03-10')).toBe(items);
  });
});
