import { useCatalogFilters } from '../../../contexts/catalogFilters/useCatalogFilters';
import { useCatalogPage } from '../../../hooks/useCatalogPage';
import type { Piece } from '../../../types/piece';
import { scrollToTop } from '../../../utils/scroll';
import { NoMatchingPieces } from './NoMatchingPieces';
import { Pagination } from '../Pagination/Pagination';
import { PieceGrid } from './PieceGrid';
import { ResultsSummary } from './ResultsSummary';

interface CatalogResultsProps {
  pieces: readonly Piece[];
}

export function CatalogResults({ pieces }: CatalogResultsProps) {
  const { changePage } = useCatalogFilters();
  const { matchingCount, visiblePieces, page, pageCount } = useCatalogPage(pieces);

  function goToPage(nextPage: number) {
    changePage(nextPage);
    scrollToTop();
  }

  return (
    <>
      <ResultsSummary matchingCount={matchingCount} />
      {matchingCount === 0 ? <NoMatchingPieces /> : <PieceGrid pieces={visiblePieces} />}
      <Pagination page={page} pageCount={pageCount} onPageChange={goToPage} />
    </>
  );
}
