import {
  DEPENDENCE_HABIT_SHARE,
  DEPENDENCE_MIN_WEARS,
  DEPENDENCE_STUCK_SHARE,
  DEPENDENCE_TOP_SIZE,
  DependenceLevel,
} from '../constants/dependence';
import type { Dependence } from '../types/dependence';
import type { PieceStat } from '../types/stats';

export function toDependenceLevel(topShare: number): DependenceLevel {
  if (topShare >= DEPENDENCE_STUCK_SHARE) return DependenceLevel.Stuck;
  if (topShare >= DEPENDENCE_HABIT_SHARE) return DependenceLevel.Habit;
  return DependenceLevel.Varied;
}

export function buildDependence(pieceStats: readonly PieceStat[]): Dependence | null {
  const totalWears = pieceStats.reduce((total, stat) => total + stat.wearCount, 0);
  if (totalWears < DEPENDENCE_MIN_WEARS) return null;
  const topPieces = pieceStats
    .toSorted((first, second) => second.wearCount - first.wearCount)
    .slice(0, DEPENDENCE_TOP_SIZE);
  const topWears = topPieces.reduce((total, stat) => total + stat.wearCount, 0);
  const topShare = Math.round((topWears / totalWears) * 100);
  return { level: toDependenceLevel(topShare), topShare, topPieces };
}
