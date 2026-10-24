import { describe, expect, it } from 'vitest';
import { buildSuitcasePlan, countPackedPieces } from './packing';
import { Availability } from '../../wardrobe/constants/wardrobe';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { Season } from '../../../shared/pieces/constants/seasons';
import { makeWardrobeItem } from '../../../test/factories';

const COLD = { minTemperature: 2, maxTemperature: 8, rainProbability: 0 };
const DATES = ['2026-03-10', '2026-03-11', '2026-03-12', '2026-03-13'];

const top = (id: number, overrides = {}) =>
  makeWardrobeItem({ id, title: `Haut ${id}`, pieceType: PieceType.Tops, ...overrides });
const bottom = (id: number, overrides = {}) =>
  makeWardrobeItem({ id, title: `Bas ${id}`, pieceType: PieceType.Bottoms, ...overrides });
const shoes = (id: number) => makeWardrobeItem({ id, pieceType: PieceType.Shoes });
const dress = (id: number) => makeWardrobeItem({ id, pieceType: PieceType.Dresses });

const ids = (items: readonly WardrobeItem[]) => items.map((item) => item.piece.id);

describe('buildSuitcasePlan', () => {
  it('prend le minimum : un haut pour 2 jours, un bas pour 3 jours, une paire de chaussures', () => {
    const items = [top(1), top(2), top(3), bottom(4), bottom(5), bottom(6), shoes(7), shoes(8)];
    const plan = buildSuitcasePlan(items, DATES, null);
    expect(ids(plan?.pieces ?? [])).toEqual([1, 2, 4, 5, 7]);
  });

  it('prépare une tenue par jour en faisant tourner les pièces', () => {
    const items = [top(1), top(2), bottom(4), bottom(5), shoes(7)];
    const plan = buildSuitcasePlan(items, DATES, null);
    expect(plan?.days.map((day) => ids(day.items))).toEqual([
      [1, 4, 7],
      [2, 5, 7],
      [1, 4, 7],
      [2, 5, 7],
    ]);
    expect(plan?.days[0].isoDate).toBe('2026-03-10');
  });

  it('garde d’abord les favoris puis les couleurs neutres', () => {
    const items = [
      top(1, { color: PieceColor.Red }),
      top(2, { color: PieceColor.Black }),
      top(3, { isFavorite: true }),
      bottom(4),
    ];
    const plan = buildSuitcasePlan(items, DATES.slice(0, 2), null);
    expect(ids(plan?.pieces ?? [])).toEqual([3, 4]);
    const twoTops = buildSuitcasePlan(items, DATES, null);
    expect(ids(twoTops?.pieces ?? [])).toEqual([3, 2, 4]);
  });

  it('écarte les pièces qui ne vont pas avec la météo', () => {
    const items = [top(1, { season: Season.Summer }), top(2), bottom(4)];
    expect(ids(buildSuitcasePlan(items, DATES, COLD)?.pieces ?? [])).toEqual([2, 4]);
  });

  it('écarte les pièces au lavage', () => {
    const items = [top(1), bottom(4, {}), { ...bottom(5), availability: Availability.Washing }];
    expect(ids(buildSuitcasePlan(items, DATES, null)?.pieces ?? [])).toEqual([1, 4]);
  });

  it('une robe se porte sans bas', () => {
    const plan = buildSuitcasePlan([dress(1), shoes(7)], DATES.slice(0, 1), null);
    expect(plan?.days.map((day) => ids(day.items))).toEqual([[1, 7]]);
  });

  it('ne compte pas de bas pour les jours en robe', () => {
    const items = [dress(1), top(2), bottom(4), bottom(5)];
    const plan = buildSuitcasePlan(items, DATES, null);
    expect(ids(plan?.pieces ?? [])).toEqual([1, 2, 4]);
  });

  it('ne propose rien sans haut ni robe', () => {
    expect(buildSuitcasePlan([bottom(4), shoes(7)], DATES, null)).toBeNull();
    expect(buildSuitcasePlan([top(1)], DATES, null)).toBeNull();
  });

  it('compte les pièces déjà dans la valise', () => {
    const plan = buildSuitcasePlan([top(1), bottom(4)], DATES, null);
    expect(plan && countPackedPieces(plan, [4, 99])).toBe(1);
  });
});
