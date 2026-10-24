import { useState } from 'react';
import { useOutfits } from '../../outfits/context/useOutfits';
import type { Outfit } from '../../outfits/types/outfit';
import { resolveOutfitItems } from '../../outfits/utils/outfits';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { clampPage } from '../../../shared/utils/pagination';

export interface LookbookState {
  outfit: Outfit | null;
  outfitItems: WardrobeItem[];
  page: number;
  pageCount: number;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}

export function useLookbook(): LookbookState {
  const { outfits } = useOutfits();
  const { items } = useWardrobe();
  const [requestedPage, setRequestedPage] = useState(1);
  const newestFirst = outfits.toReversed();
  const pageCount = newestFirst.length;
  const page = clampPage(requestedPage, Math.max(pageCount, 1));
  const outfit = newestFirst[page - 1] ?? null;

  return {
    outfit,
    outfitItems: outfit ? resolveOutfitItems(outfit, items) : [],
    page,
    pageCount,
    goToPreviousPage: () => setRequestedPage(page - 1),
    goToNextPage: () => setRequestedPage(page + 1),
  };
}
