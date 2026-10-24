import { RANKING_SIZE } from '../constants/stats';
import type { PieceStat, WardrobeStats } from '../types/stats';
import { getWearCount, type WearCounts } from '../../calendar/utils/wearCounts';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

export function computeCostPerWear(price: number, wearCount: number): number | null {
  return wearCount > 0 ? price / wearCount : null;
}

function toPieceStat(item: WardrobeItem, counts: WearCounts): PieceStat {
  const wearCount = getWearCount(counts, item.piece.id);
  return { item, wearCount, costPerWear: computeCostPerWear(item.piece.price, wearCount) };
}

function sum(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

function byMostWorn(first: PieceStat, second: PieceStat): number {
  return second.wearCount - first.wearCount;
}

function byCheapestPerWear(first: PieceStat, second: PieceStat): number {
  return (first.costPerWear ?? 0) - (second.costPerWear ?? 0);
}

function toRankingScore(stat: PieceStat): number {
  return stat.costPerWear ?? stat.item.piece.price;
}

function byLeastAmortized(first: PieceStat, second: PieceStat): number {
  return toRankingScore(second) - toRankingScore(first);
}

export function buildWardrobeStats(
  items: readonly WardrobeItem[],
  counts: WearCounts,
): WardrobeStats {
  const stats = items
    .filter((item) => item.status === OwnershipStatus.Owned)
    .map((item) => toPieceStat(item, counts));
  const worn = stats.filter((stat) => stat.wearCount > 0);
  const totalSpent = sum(stats.map((stat) => stat.item.piece.price));
  const totalWears = sum(stats.map((stat) => stat.wearCount));

  return {
    ownedCount: stats.length,
    totalSpent,
    totalWears,
    averageCostPerWear: computeCostPerWear(totalSpent, totalWears),
    neverWornCount: stats.length - worn.length,
    mostWorn: worn.toSorted(byMostWorn).slice(0, RANKING_SIZE),
    bestValue: worn.toSorted(byCheapestPerWear).slice(0, RANKING_SIZE),
    toAmortize: stats
      .filter((stat) => stat.item.piece.price > 0)
      .toSorted(byLeastAmortized)
      .slice(0, RANKING_SIZE),
  };
}

export function formatWearCount(wearCount: number): string {
  if (wearCount === 0) return 'Jamais portée';
  return wearCount === 1 ? 'Portée 1 fois' : `Portée ${wearCount} fois`;
}
