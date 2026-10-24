import { useWearCounts } from '../../calendar/hooks/useWearCounts';
import { getWearCount } from '../../calendar/utils/wearCounts';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import type { Dependence } from '../types/dependence';
import { buildDependence } from '../utils/dependence';

export function useDependence(): Dependence | null {
  const { items } = useWardrobe();
  const counts = useWearCounts();
  const pieceStats = items
    .filter((item) => item.status === OwnershipStatus.Owned)
    .map((item) => ({
      item,
      wearCount: getWearCount(counts, item.piece.id),
      costPerWear: null,
    }));
  return buildDependence(pieceStats);
}
