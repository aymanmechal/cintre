import { useState } from 'react';
import { clampPage, countPages, selectPage } from '../../../shared/utils/pagination';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { matchesSearch } from '../../wardrobe/utils/wardrobeView';
import { PIECE_SHELF_PAGE_SIZE } from '../constants/outfits';

export interface PieceShelfListState {
  visibleItems: WardrobeItem[];
  search: string;
  page: number;
  pageCount: number;
  changeSearch: (search: string) => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}

export function usePieceShelfList(items: readonly WardrobeItem[]): PieceShelfListState {
  const [search, setSearch] = useState('');
  const [requestedPage, setRequestedPage] = useState(1);

  const matchingItems = items.filter((item) => matchesSearch(item, search));
  const pageCount = countPages(matchingItems.length, PIECE_SHELF_PAGE_SIZE);
  const page = clampPage(requestedPage, pageCount);

  return {
    visibleItems: selectPage(matchingItems, page, PIECE_SHELF_PAGE_SIZE),
    search,
    page,
    pageCount,
    changeSearch: (newSearch) => {
      setSearch(newSearch);
      setRequestedPage(1);
    },
    goToPreviousPage: () => setRequestedPage(page - 1),
    goToNextPage: () => setRequestedPage(page + 1),
  };
}
