import { useEffect } from 'react';
import { useOutfits } from '../../outfits/context/useOutfits';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { useWornLog } from '../context/useWornLog';
import { isFutureDate } from '../../wardrobe/utils/wornDates';
import { findOutfit } from '../utils/wornLog';
import { useToday } from '../../../shared/hooks/useToday';

export function useSyncWornOutfits(): void {
  const { entries } = useWornLog();
  const { outfits } = useOutfits();
  const { markPiecesWorn } = useWardrobe();
  const today = useToday();

  useEffect(() => {
    entries
      .filter((entry) => !isFutureDate(entry.date, today))
      .forEach((entry) => {
        const outfit = findOutfit(outfits, entry.outfitId);
        if (outfit) markPiecesWorn(outfit.pieceIds, entry.date);
      });
  }, [entries, outfits, today, markPiecesWorn]);
}
