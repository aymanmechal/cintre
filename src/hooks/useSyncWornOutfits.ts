import { useEffect } from 'react';
import { useOutfits } from '../contexts/outfits/useOutfits';
import { useWardrobe } from '../contexts/wardrobe/useWardrobe';
import { useWornLog } from '../contexts/wornLog/useWornLog';
import { isFutureDate } from '../utils/wornDates';
import { findOutfit } from '../utils/wornLog';
import { useToday } from './useToday';

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
