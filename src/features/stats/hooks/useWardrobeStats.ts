import { useWearCounts } from '../../calendar/hooks/useWearCounts';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import type { WardrobeStats } from '../types/stats';
import { buildWardrobeStats } from '../utils/stats';

export function useWardrobeStats(): WardrobeStats {
  const { items } = useWardrobe();
  return buildWardrobeStats(items, useWearCounts());
}
