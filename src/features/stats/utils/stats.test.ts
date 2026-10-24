import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import { buildWardrobeStats, computeCostPerWear, formatWearCount } from './stats';

const JEANS = makeWardrobeItem({ id: 1, price: 80 });
const SHIRT = makeWardrobeItem({ id: 2, price: 20 });
const COAT = makeWardrobeItem({ id: 3, price: 200 });
const WISH = makeWardrobeItem({ id: 4, price: 500 }, { status: OwnershipStatus.Wanted });
const COUNTS = new Map([
  [1, 40],
  [2, 4],
]);

describe('computeCostPerWear', () => {
  it('divise le prix par le nombre de ports', () => {
    expect(computeCostPerWear(80, 40)).toBe(2);
  });

  it('renvoie null quand la pièce est jamais portée', () => {
    expect(computeCostPerWear(80, 0)).toBeNull();
  });
});

describe('buildWardrobeStats', () => {
  const stats = buildWardrobeStats([JEANS, SHIRT, COAT, WISH], COUNTS);

  it('ignore les envies dans les totaux', () => {
    expect(stats.ownedCount).toBe(3);
    expect(stats.totalSpent).toBe(300);
    expect(stats.totalWears).toBe(44);
    expect(stats.neverWornCount).toBe(1);
  });

  it('calcule le coût moyen par port', () => {
    expect(stats.averageCostPerWear).toBeCloseTo(300 / 44);
  });

  it('classe les plus portées et les plus rentables', () => {
    expect(stats.mostWorn.map((stat) => stat.item.piece.id)).toEqual([1, 2]);
    expect(stats.bestValue.map((stat) => stat.item.piece.id)).toEqual([1, 2]);
  });

  it('met en tête les pièces pas encore rentabilisées', () => {
    expect(stats.toAmortize.map((stat) => stat.item.piece.id)).toEqual([3, 2, 1]);
  });

  it('renvoie un coût moyen nul quand rien n est porté', () => {
    expect(buildWardrobeStats([JEANS], new Map()).averageCostPerWear).toBeNull();
  });
});

describe('formatWearCount', () => {
  it('accorde le texte au nombre de ports', () => {
    expect(formatWearCount(0)).toBe('Jamais portée');
    expect(formatWearCount(1)).toBe('Portée 1 fois');
    expect(formatWearCount(12)).toBe('Portée 12 fois');
  });
});
