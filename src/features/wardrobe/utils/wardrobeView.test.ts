import { describe, expect, it } from 'vitest';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { Season } from '../../../shared/pieces/constants/seasons';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { makeWardrobeItem } from '../../../test/factories';
import { Availability, OwnershipStatus } from '../constants/wardrobe';
import {
  INITIAL_WARDROBE_VIEW,
  UNGROUPED_ID,
  WardrobeGrouping,
  WardrobeSortOrder,
} from '../constants/wardrobeView';
import type { WardrobeView } from '../types/wardrobeView';
import {
  buildWardrobeGroups,
  countActiveFilters,
  hasActiveFilters,
  matchesSearch,
  resolveGrouping,
  toWardrobeGrouping,
  toWardrobeSortOrder,
} from './wardrobeView';

const SHIRT = makeWardrobeItem({ id: 1, title: 'Chemise', price: 80 });
const SHOES = makeWardrobeItem(
  { id: 2, title: 'Baskets', pieceType: PieceType.Shoes, price: 150 },
  { lastWornOn: '2025-01-01' },
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
    expect(titles(view({ pieceTypes: [PieceType.Shoes] }))).toEqual(['Baskets']);
  });

  it('garde les pièces de plusieurs types cochés (OU)', () => {
    expect(titles(view({ pieceTypes: [PieceType.Shoes, PieceType.Bags] })).sort()).toEqual([
      'Baskets',
      'Sac',
    ]);
  });

  it('ne filtre pas par type quand aucun type n’est coché', () => {
    expect(titles(view({ pieceTypes: [] }))).toHaveLength(3);
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
    expect(resolveGrouping(OwnershipStatus.Owned, WardrobeGrouping.None)).toBe(
      WardrobeGrouping.None,
    );
    expect(resolveGrouping(OwnershipStatus.Wanted, WardrobeGrouping.PieceType)).toBe(
      WardrobeGrouping.PieceType,
    );
  });

  it('regroupe par type par défaut', () => {
    expect(INITIAL_WARDROBE_VIEW.grouping).toBe(WardrobeGrouping.PieceType);
  });

  it('ne propose plus le rangement', () => {
    expect(Object.values(WardrobeGrouping)).toEqual([
      WardrobeGrouping.PieceType,
      WardrobeGrouping.None,
    ]);
  });
});

describe('conversion de valeurs de select', () => {
  it('reconnaît les tris et regroupements valides, sinon valeur de secours', () => {
    expect(toWardrobeSortOrder('nom')).toBe(WardrobeSortOrder.NameAscending);
    expect(toWardrobeSortOrder('?')).toBe(WardrobeSortOrder.Recent);
    expect(toWardrobeGrouping('type')).toBe(WardrobeGrouping.PieceType);
    expect(toWardrobeGrouping('?')).toBe(WardrobeGrouping.None);
    expect(toWardrobeGrouping('rangement')).toBe(WardrobeGrouping.None);
  });
});

describe('buildWardrobeGroups : recherche et filtres', () => {
  const RED_SCARF = makeWardrobeItem({
    id: 10,
    title: 'Écharpe',
    brand: 'Zara',
    color: PieceColor.Red,
    season: Season.Winter,
    tags: ['noel'],
    isFavorite: true,
  });
  const BLUE_TEE = makeWardrobeItem({
    id: 11,
    title: 'T-shirt',
    color: PieceColor.Blue,
    season: Season.Summer,
  });
  const PIECES = [RED_SCARF, BLUE_TEE];

  function titlesOf(changes: Partial<WardrobeView>): string[] {
    return buildWardrobeGroups(PIECES, view(changes)).flatMap((group) =>
      group.items.map((item) => item.piece.title),
    );
  }

  it('cherche dans le nom, la marque et les tags sans tenir compte des accents', () => {
    expect(titlesOf({ search: 'echarpe' })).toEqual(['Écharpe']);
    expect(titlesOf({ search: 'zara' })).toEqual(['Écharpe']);
    expect(titlesOf({ search: 'NOEL' })).toEqual(['Écharpe']);
    expect(titlesOf({ search: 'introuvable' })).toEqual([]);
  });

  it('filtre par couleur, saison, tag et favoris', () => {
    expect(titlesOf({ colors: [PieceColor.Blue] })).toEqual(['T-shirt']);
    expect(titlesOf({ season: Season.Winter })).toEqual(['Écharpe']);
    expect(titlesOf({ tag: 'noel' })).toEqual(['Écharpe']);
    expect(titlesOf({ onlyFavorites: true })).toEqual(['Écharpe']);
  });

  it('ne garde que les pièces disponibles', () => {
    const dirty = makeWardrobeItem({ id: 12, title: 'Sale' }, { availability: Availability.Dirty });
    const groups = buildWardrobeGroups([dirty, BLUE_TEE], view({ onlyAvailable: true }));
    expect(groups.flatMap((group) => group.items.map((item) => item.piece.title))).toEqual([
      'T-shirt',
    ]);
  });

  it('combine plusieurs filtres', () => {
    expect(titlesOf({ colors: [PieceColor.Blue], onlyFavorites: true })).toEqual([]);
  });

  it('garde les pièces de plusieurs couleurs cochées (OU)', () => {
    expect(titlesOf({ colors: [PieceColor.Blue, PieceColor.Red] }).sort()).toEqual([
      'T-shirt',
      'Écharpe',
    ]);
  });

  it('garde une pièce dont la couleur secondaire est cochée', () => {
    const striped = makeWardrobeItem({
      id: 14,
      title: 'Rayé',
      color: PieceColor.White,
      secondaryColor: PieceColor.Blue,
    });
    const groups = buildWardrobeGroups([striped, RED_SCARF], view({ colors: [PieceColor.Blue] }));
    expect(groups.flatMap((group) => group.items.map((item) => item.piece.title))).toEqual([
      'Rayé',
    ]);
  });

  it('garde une pièce dont la principale OU la secondaire est cochée', () => {
    const striped = makeWardrobeItem({
      id: 14,
      title: 'Rayé',
      color: PieceColor.White,
      secondaryColor: PieceColor.Blue,
    });
    const titles = buildWardrobeGroups(
      [striped, RED_SCARF, BLUE_TEE],
      view({ colors: [PieceColor.White, PieceColor.Red] }),
    ).flatMap((group) => group.items.map((item) => item.piece.title));
    expect(titles.sort()).toEqual(['Rayé', 'Écharpe']);
  });

  it('ignore une pièce sans aucune des couleurs cochées, même avec une secondaire', () => {
    const striped = makeWardrobeItem({
      id: 14,
      title: 'Rayé',
      color: PieceColor.White,
      secondaryColor: PieceColor.Blue,
    });
    const groups = buildWardrobeGroups([striped], view({ colors: [PieceColor.Green] }));
    expect(groups).toEqual([]);
  });

  it('garde une pièce sans couleur principale mais avec une secondaire cochée', () => {
    const onlySecondary = makeWardrobeItem({
      id: 15,
      title: 'Seconde',
      color: null,
      secondaryColor: PieceColor.Red,
    });
    const groups = buildWardrobeGroups([onlySecondary], view({ colors: [PieceColor.Red] }));
    expect(groups).toHaveLength(1);
  });

  it('ne filtre pas par couleur quand aucune couleur n’est cochée', () => {
    expect(titlesOf({ colors: [] })).toHaveLength(2);
  });

  it('ignore une pièce sans couleur dès qu’une couleur est cochée', () => {
    const plain = makeWardrobeItem({ id: 13, title: 'Neutre', color: null });
    const groups = buildWardrobeGroups([plain, BLUE_TEE], view({ colors: [PieceColor.Blue] }));
    expect(groups.flatMap((group) => group.items.map((item) => item.piece.title))).toEqual([
      'T-shirt',
    ]);
  });

  it('sait si un filtre est actif', () => {
    expect(hasActiveFilters(INITIAL_WARDROBE_VIEW)).toBe(false);
    expect(hasActiveFilters({ ...INITIAL_WARDROBE_VIEW, search: ' a ' })).toBe(true);
    expect(hasActiveFilters({ ...INITIAL_WARDROBE_VIEW, onlyFavorites: true })).toBe(true);
  });

  it('compte les types et les couleurs cochés comme des filtres actifs', () => {
    expect(hasActiveFilters({ ...INITIAL_WARDROBE_VIEW, pieceTypes: [PieceType.Bags] })).toBe(true);
    expect(hasActiveFilters({ ...INITIAL_WARDROBE_VIEW, colors: [PieceColor.Red] })).toBe(true);
  });
});

describe('buildWardrobeGroups : ET entre les filtres', () => {
  const BLUE_SHIRT = makeWardrobeItem({ id: 20, title: 'Chemise bleue', color: PieceColor.Blue });
  const RED_SHIRT = makeWardrobeItem({ id: 21, title: 'Chemise rouge', color: PieceColor.Red });
  const BLUE_SHOES = makeWardrobeItem({
    id: 22,
    title: 'Baskets bleues',
    pieceType: PieceType.Shoes,
    color: PieceColor.Blue,
  });
  const GREEN_SHOES = makeWardrobeItem({
    id: 23,
    title: 'Baskets vertes',
    pieceType: PieceType.Shoes,
    color: PieceColor.Green,
  });
  const PIECES = [BLUE_SHIRT, RED_SHIRT, BLUE_SHOES, GREEN_SHOES];

  function titlesOf(changes: Partial<WardrobeView>): string[] {
    return buildWardrobeGroups(PIECES, view(changes))
      .flatMap((group) => group.items.map((item) => item.piece.title))
      .sort();
  }

  it('exige un type coché ET une couleur cochée', () => {
    expect(
      titlesOf({
        pieceTypes: [PieceType.Shirts, PieceType.Shoes],
        colors: [PieceColor.Blue, PieceColor.Green],
      }),
    ).toEqual(['Baskets bleues', 'Baskets vertes', 'Chemise bleue']);
  });

  it('croise un type et plusieurs couleurs', () => {
    expect(
      titlesOf({ pieceTypes: [PieceType.Shirts], colors: [PieceColor.Blue, PieceColor.Red] }),
    ).toEqual(['Chemise bleue', 'Chemise rouge']);
  });

  it('croise types, couleurs et recherche', () => {
    expect(
      titlesOf({
        pieceTypes: [PieceType.Shoes],
        colors: [PieceColor.Blue, PieceColor.Green],
        search: 'vertes',
      }),
    ).toEqual(['Baskets vertes']);
  });

  it('ne renvoie rien quand types et couleurs ne se rencontrent pas', () => {
    expect(titlesOf({ pieceTypes: [PieceType.Shirts], colors: [PieceColor.Green] })).toEqual([]);
  });
});

describe('countActiveFilters', () => {
  it('vaut 0 sans filtre', () => {
    expect(countActiveFilters(INITIAL_WARDROBE_VIEW)).toBe(0);
  });

  it('compte les couleurs pour 1, quel que soit leur nombre', () => {
    expect(countActiveFilters({ ...INITIAL_WARDROBE_VIEW, colors: [PieceColor.Red] })).toBe(1);
    expect(
      countActiveFilters({
        ...INITIAL_WARDROBE_VIEW,
        colors: [PieceColor.Red, PieceColor.Blue, PieceColor.Green],
      }),
    ).toBe(1);
  });

  it('compte la saison, le tag, les favoris et les disponibles', () => {
    expect(countActiveFilters({ ...INITIAL_WARDROBE_VIEW, season: Season.Winter })).toBe(1);
    expect(countActiveFilters({ ...INITIAL_WARDROBE_VIEW, tag: 'noel' })).toBe(1);
    expect(countActiveFilters({ ...INITIAL_WARDROBE_VIEW, onlyFavorites: true })).toBe(1);
    expect(countActiveFilters({ ...INITIAL_WARDROBE_VIEW, onlyAvailable: true })).toBe(1);
  });

  it('additionne tous les filtres du panneau', () => {
    expect(
      countActiveFilters({
        ...INITIAL_WARDROBE_VIEW,
        colors: [PieceColor.Red, PieceColor.Blue],
        season: Season.Summer,
        tag: 'noel',
        onlyFavorites: true,
        onlyAvailable: true,
      }),
    ).toBe(5);
  });

  it('ne compte ni la recherche ni les types', () => {
    expect(
      countActiveFilters({
        ...INITIAL_WARDROBE_VIEW,
        search: 'chemise',
        pieceTypes: [PieceType.Shirts, PieceType.Shoes],
      }),
    ).toBe(0);
  });
});

describe('matchesSearch', () => {
  const BLUE_BAG = makeWardrobeItem({
    id: 30,
    title: 'Besace',
    brand: 'Longchamp',
    size: 'M',
    pieceType: PieceType.Bags,
    color: PieceColor.Blue,
    tags: ['voyage'],
  });
  const PLAIN = makeWardrobeItem({ id: 31, title: 'Anonyme', color: null });

  it('trouve par le libellé de la couleur, sans tenir compte de la casse', () => {
    expect(matchesSearch(BLUE_BAG, 'bleu')).toBe(true);
    expect(matchesSearch(BLUE_BAG, 'BLEU')).toBe(true);
    expect(matchesSearch(BLUE_BAG, 'rouge')).toBe(false);
  });

  it('trouve par le libellé de la couleur secondaire', () => {
    const striped = makeWardrobeItem({
      title: 'Rayé',
      color: PieceColor.White,
      secondaryColor: PieceColor.Burgundy,
    });
    expect(matchesSearch(striped, 'bordeaux')).toBe(true);
    expect(matchesSearch(striped, 'blanc')).toBe(true);
    expect(matchesSearch(striped, 'rouge')).toBe(false);
  });

  it('trouve une couleur à plusieurs mots ou accentuée', () => {
    const navy = makeWardrobeItem({ color: PieceColor.Navy, secondaryColor: PieceColor.Cream });
    expect(matchesSearch(navy, 'bleu marine')).toBe(true);
    expect(matchesSearch(navy, 'creme')).toBe(true);
  });

  it('trouve par le libellé du type de pièce', () => {
    expect(matchesSearch(BLUE_BAG, 'sacs')).toBe(true);
    expect(matchesSearch(BLUE_BAG, 'chaussures')).toBe(false);
  });

  it('ignore les accents dans le libellé du type et de la couleur', () => {
    const jacket = makeWardrobeItem({ title: 'Veste', pieceType: PieceType.Jackets });
    expect(matchesSearch(jacket, 'VÉSTES')).toBe(true);
    expect(matchesSearch(jacket, 'vestes')).toBe(true);
  });

  it('cherche toujours dans le titre, la marque, la taille et les tags', () => {
    expect(matchesSearch(BLUE_BAG, 'besace')).toBe(true);
    expect(matchesSearch(BLUE_BAG, 'longchamp')).toBe(true);
    expect(matchesSearch(BLUE_BAG, 'voyage')).toBe(true);
    expect(matchesSearch(makeWardrobeItem({ size: 'XL' }), 'xl')).toBe(true);
  });

  it('accepte une recherche vide', () => {
    expect(matchesSearch(PLAIN, '')).toBe(true);
    expect(matchesSearch(PLAIN, '   ')).toBe(true);
  });

  it('ne plante pas pour une pièce sans couleur', () => {
    expect(matchesSearch(PLAIN, 'bleu')).toBe(false);
  });
});
