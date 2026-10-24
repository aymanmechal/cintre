import { useState } from 'react';
import { clampPage, countPages, selectPage } from '../../../shared/utils/pagination';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { ALL_OCCASIONS } from '../constants/occasions';
import { OUTFIT_LIST_PAGE_SIZE } from '../constants/outfits';
import { useOutfits } from '../context/useOutfits';
import type { Outfit } from '../types/outfit';
import { filterOutfitsByOccasion, type OccasionFilter } from '../utils/occasions';
import { filterOutfitsBySearch } from '../utils/outfitSearch';

export interface OutfitListState {
  allOutfits: Outfit[];
  totalCount: number;
  visibleOutfits: Outfit[];
  items: WardrobeItem[];
  search: string;
  occasion: OccasionFilter;
  page: number;
  pageCount: number;
  changeSearch: (search: string) => void;
  changeOccasion: (occasion: OccasionFilter) => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}

export function useOutfitList(): OutfitListState {
  const { outfits } = useOutfits();
  const { items } = useWardrobe();
  const [search, setSearch] = useState('');
  const [occasion, setOccasion] = useState<OccasionFilter>(ALL_OCCASIONS);
  const [requestedPage, setRequestedPage] = useState(1);

  const matchingOutfits = filterOutfitsByOccasion(
    filterOutfitsBySearch(outfits, items, search),
    occasion,
  ).toReversed();
  const pageCount = countPages(matchingOutfits.length, OUTFIT_LIST_PAGE_SIZE);
  const page = clampPage(requestedPage, pageCount);

  return {
    allOutfits: outfits,
    totalCount: outfits.length,
    visibleOutfits: selectPage(matchingOutfits, page, OUTFIT_LIST_PAGE_SIZE),
    items,
    search,
    occasion,
    page,
    pageCount,
    changeSearch: (newSearch) => {
      setSearch(newSearch);
      setRequestedPage(1);
    },
    changeOccasion: (newOccasion) => {
      setOccasion(newOccasion);
      setRequestedPage(1);
    },
    goToPreviousPage: () => setRequestedPage(page - 1),
    goToNextPage: () => setRequestedPage(page + 1),
  };
}
