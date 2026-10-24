import { useOutfits } from '../../outfits/context/useOutfits';
import { useWornLog } from '../context/useWornLog';
import { countWearsByPiece, type WearCounts } from '../utils/wearCounts';
import { useToday } from '../../../shared/hooks/useToday';

export function useWearCounts(): WearCounts {
  const { entries } = useWornLog();
  const { outfits } = useOutfits();
  const today = useToday();
  return countWearsByPiece(entries, outfits, today);
}
