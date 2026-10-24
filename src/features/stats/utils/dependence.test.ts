import { describe, expect, it } from 'vitest';
import { DependenceLevel } from '../constants/dependence';
import { makeWardrobeItem } from '../../../test/factories';
import type { PieceStat } from '../types/stats';
import { buildDependence, toDependenceLevel } from './dependence';

function stat(id: number, wearCount: number): PieceStat {
  return { item: makeWardrobeItem({ id }), wearCount, costPerWear: null };
}

describe('toDependenceLevel', () => {
  it('classe selon la part des 3 pièces préférées', () => {
    expect(toDependenceLevel(20)).toBe(DependenceLevel.Varied);
    expect(toDependenceLevel(40)).toBe(DependenceLevel.Habit);
    expect(toDependenceLevel(60)).toBe(DependenceLevel.Stuck);
  });
});

describe('buildDependence', () => {
  it('attend assez de ports avant de juger', () => {
    expect(buildDependence([stat(1, 3), stat(2, 2)])).toBeNull();
  });

  it('calcule la part des 3 pièces les plus portées', () => {
    const result = buildDependence([stat(1, 8), stat(2, 6), stat(3, 4), stat(4, 1), stat(5, 1)]);
    expect(result?.topShare).toBe(90);
    expect(result?.level).toBe(DependenceLevel.Stuck);
    expect(result?.topPieces.map((piece) => piece.item.piece.id)).toEqual([1, 2, 3]);
  });

  it('reconnaît une garde-robe variée', () => {
    const stats = Array.from({ length: 12 }, (_, index) => stat(index + 1, 2));
    expect(buildDependence(stats)?.level).toBe(DependenceLevel.Varied);
  });
});
