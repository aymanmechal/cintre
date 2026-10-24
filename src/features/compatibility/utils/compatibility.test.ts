import { describe, expect, it } from 'vitest';
import {
  buildCompatibilityGraph,
  findChosenNode,
  formatPossibleOutfits,
  groupPartnersBySlot,
  selectEssentialNodes,
  selectIsolatedNodes,
} from './compatibility';
import { OutfitSlot } from '../../outfits/constants/outfits';
import { Availability } from '../../wardrobe/constants/wardrobe';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { Season } from '../../../shared/pieces/constants/seasons';
import { makeWardrobeItem } from '../../../test/factories';

const TEE = makeWardrobeItem({ id: 1, title: 'Tee', pieceType: PieceType.Tops });
const SHIRT = makeWardrobeItem({ id: 2, title: 'Chemise', pieceType: PieceType.Shirts });
const WINTER_SWEATER = makeWardrobeItem({
  id: 3,
  title: 'Pull hiver',
  pieceType: PieceType.Tops,
  season: Season.Winter,
});
const JEANS = makeWardrobeItem({ id: 4, title: 'Jean', pieceType: PieceType.Bottoms });
const SUMMER_SHORTS = makeWardrobeItem({
  id: 5,
  title: 'Short été',
  pieceType: PieceType.Bottoms,
  season: Season.Summer,
});
const SNEAKERS = makeWardrobeItem({ id: 6, title: 'Baskets', pieceType: PieceType.Shoes });
const DIRTY_TROUSERS = makeWardrobeItem(
  { id: 7, title: 'Pantalon sale', pieceType: PieceType.Bottoms },
  { availability: Availability.Dirty },
);
const WATCH = makeWardrobeItem({ id: 8, title: 'Montre', pieceType: PieceType.Watches });
const ITEMS = [TEE, SHIRT, WINTER_SWEATER, JEANS, SUMMER_SHORTS, SNEAKERS, DIRTY_TROUSERS, WATCH];

function titlesOf(nodes: { item: { piece: { title: string } } }[]): string[] {
  return nodes.map((node) => node.item.piece.title);
}

describe('buildCompatibilityGraph', () => {
  it('classe les pièces selon le nombre de tenues possibles', () => {
    const nodes = buildCompatibilityGraph(ITEMS);
    expect(titlesOf(nodes)).toEqual([
      'Baskets',
      'Jean',
      'Tee',
      'Chemise',
      'Short été',
      'Pull hiver',
    ]);
    expect(nodes.map((node) => node.outfitCount)).toEqual([5, 3, 2, 2, 2, 1]);
  });

  it('relie chaque pièce à celles avec qui elle va', () => {
    const sweater = buildCompatibilityGraph(ITEMS).find((node) => node.item === WINTER_SWEATER);
    expect(sweater?.partners).toEqual([JEANS, SNEAKERS]);
  });

  it('ignore les pièces indisponibles et les accessoires', () => {
    const titles = titlesOf(buildCompatibilityGraph(ITEMS));
    expect(titles).not.toContain('Pantalon sale');
    expect(titles).not.toContain('Montre');
  });

  it('repère les pièces isolées', () => {
    const nodes = buildCompatibilityGraph([JEANS, SNEAKERS]);
    expect(titlesOf(selectIsolatedNodes(nodes))).toEqual(['Jean', 'Baskets']);
    expect(selectEssentialNodes(nodes)).toEqual([]);
  });
});

describe('selectEssentialNodes', () => {
  it('garde les 5 pièces qui créent le plus de tenues', () => {
    const nodes = buildCompatibilityGraph(ITEMS);
    expect(titlesOf(selectEssentialNodes(nodes))).toEqual([
      'Baskets',
      'Jean',
      'Tee',
      'Chemise',
      'Short été',
    ]);
  });
});

describe('groupPartnersBySlot', () => {
  it('range les partenaires par Haut, Bas et Chaussures', () => {
    const jeans = buildCompatibilityGraph(ITEMS).find((node) => node.item === JEANS);
    const groups = groupPartnersBySlot(jeans!);
    expect(groups.map((group) => group.slot)).toEqual([OutfitSlot.Top, OutfitSlot.Shoes]);
    expect(groups[0].items).toEqual([TEE, SHIRT, WINTER_SWEATER]);
  });
});

describe('findChosenNode', () => {
  it('retrouve la pièce choisie, sinon la première', () => {
    const nodes = buildCompatibilityGraph(ITEMS);
    expect(findChosenNode(nodes, 4)?.item).toBe(JEANS);
    expect(findChosenNode(nodes, null)?.item).toBe(SNEAKERS);
    expect(findChosenNode([], null)).toBeNull();
  });
});

describe('formatPossibleOutfits', () => {
  it('accorde le texte', () => {
    expect(formatPossibleOutfits(0)).toBe('Aucune tenue possible');
    expect(formatPossibleOutfits(1)).toBe('1 tenue possible');
    expect(formatPossibleOutfits(3)).toBe('3 tenues possibles');
  });
});
