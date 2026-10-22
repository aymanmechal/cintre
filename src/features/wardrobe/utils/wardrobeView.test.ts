import { describe, expect, it } from 'vitest';
import { ALL_PIECE_TYPES, PieceType } from '../../../shared/pieces/constants/categories';
import { makeWardrobeItem } from '../../../test/factories';
import { OwnershipStatus, StorageLocation } from '../constants/wardrobe';
import {
  INITIAL_WARDROBE_VIEW,
  UNGROUPED_ID,
  WardrobeGrouping,
  WardrobeSortOrder,
} from '../constants/wardrobeView';
import type { WardrobeView } from '../types/wardrobeView';
import {
  buildWardrobeGroups,
  resolveGrouping,
  toWardrobeGrouping,
  toWardrobeSortOrder,
} from './wardrobeView';

const SHIRT = makeWardrobeItem({ id: 1, title: 'Chemise', price: 80 });
const SHOES = makeWardrobeItem(
  { id: 2, title: 'Baskets', pieceType: PieceType.Shoes, price: 150 },
  { location: StorageLocation.Drawer, lastWornOn: '2025-01-01' },
);
const BAG = makeWardrobeItem(
  { id: 3, title: 'Sac', pieceType: PieceType.Bags, price: 20 },
  { lastWornOn: '2025-02-01' },
);
const WISH = makeWardrobeItem({ id: 4 }, { status: OwnershipStatus.Wanted });
const ITEMS = [SHIRT, SHOES, BAG, WISH];

function view(changes: Partial<WardrobeView>): WardrobeView {
  return { ...INITIAL_WARDROBE_VIEW, grouping: WardrobeGrouping.None, ...changes };
}

function titles(view: WardrobeView): string[] {
  return buildWardrobeGroups(ITEMS, view).flatMap((group) =>
    group.items.map((item) => item.piece.title),
  );
}

describe('buildWardrobeGroups', () => {
  it('ne garde que les pièces du statut demandé', () => {
    expect(titles(view({ status: OwnershipStatus.Owned }))).not.toContain(WISH.piece.title);
    expect(buildWardrobeGroups(ITEMS, view({ status: OwnershipStatus.Wanted }))[0].items).toEqual([
      WISH,
    ]);
  });

  it('filtre par type', () => {
    expect(titles(view({ pieceType: PieceType.Shoes }))).toEqual(['Baskets']);
    expect(titles(view({ pieceType: ALL_PIECE_TYPES }))).toHaveLength(3);
  });

  it('trie par ajout récent (dernier ajout en premier)', () => {
    expect(titles(view({ sortOrder: WardrobeSortOrder.Recent }))).toEqual([
      'Sac',
      'Baskets',
      'Chemise',
    ]);
  });

  it('trie par nom, par prix croissant et décroissant', () => {
    expect(titles(view({ sortOrder: WardrobeSortOrder.NameAscending }))).toEqual([
      'Baskets',
      'Chemise',
      'Sac',
    ]);
    expect(titles(view({ sortOrder: WardrobeSortOrder.PriceAscending }))).toEqual([
      'Sac',
      'Chemise',
      'Baskets',
    ]);
    expect(titles(view({ sortOrder: WardrobeSortOrder.PriceDescending }))).toEqual([
      'Baskets',
      'Chemise',
      'Sac',
    ]);
  });

  it("met les plus oubliées d'abord", () => {
    expect(titles(view({ sortOrder: WardrobeSortOrder.LeastRecentlyWorn }))).toEqual([
      'Chemise',
      'Baskets',
      'Sac',
    ]);
  });

  it('regroupe par rangement en sautant les groupes vides', () => {
    const groups = buildWardrobeGroups(ITEMS, view({ grouping: WardrobeGrouping.Location }));
    expect(groups.map((group) => group.id)).toEqual([
      StorageLocation.Wardrobe,
      StorageLocation.Drawer,
    ]);
  });

  it('regroupe par type', () => {
    const groups = buildWardrobeGroups(ITEMS, view({ grouping: WardrobeGrouping.PieceType }));
    expect(groups.map((group) => group.id)).toEqual([
      PieceType.Shirts,
      PieceType.Shoes,
      PieceType.Bags,
    ]);
  });

  it('renvoie un seul groupe sans titre quand on ne regroupe pas', () => {
    const [group] = buildWardrobeGroups(ITEMS, view({}));
    expect(group).toMatchObject({ id: UNGROUPED_ID, title: null });
  });

  it('renvoie aucun groupe quand rien ne correspond', () => {
    expect(buildWardrobeGroups([], view({}))).toEqual([]);
  });
});

describe('resolveGrouping', () => {
  it('garde un regroupement autorisé', () => {
    expect(resolveGrouping(OwnershipStatus.Owned, WardrobeGrouping.Location)).toBe(
      WardrobeGrouping.Location,
    );
  });

  it('remplace le rangement pour les envies (on ne les range pas)', () => {
    expect(resolveGrouping(OwnershipStatus.Wanted, WardrobeGrouping.Location)).toBe(
      WardrobeGrouping.PieceType,
    );
  });
});

describe('conversion de valeurs de select', () => {
  it('reconnaît les tris et regroupements valides, sinon valeur de secours', () => {
    expect(toWardrobeSortOrder('nom')).toBe(WardrobeSortOrder.NameAscending);
    expect(toWardrobeSortOrder('?')).toBe(WardrobeSortOrder.Recent);
    expect(toWardrobeGrouping('type')).toBe(WardrobeGrouping.PieceType);
    expect(toWardrobeGrouping('?')).toBe(WardrobeGrouping.None);
  });
});
