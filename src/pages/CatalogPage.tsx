import { CatalogToolbar } from '../components/catalog/CatalogToolbar';
import { Pagination } from '../components/catalog/Pagination';
import { PieceGrid } from '../components/catalog/PieceGrid';
import { ResultsSummary } from '../components/catalog/ResultsSummary';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Loader } from '../components/ui/Loader';
import { PIECES_PER_PAGE } from '../constants/catalog';
import { useCatalogFilters } from '../contexts/catalogFilters/useCatalogFilters';
import { useCatalog } from '../hooks/useCatalog';
import type { Piece } from '../types/piece';
import { filterPieces, hasActiveFilters } from '../utils/filterPieces';
import { countPages, paginate } from '../utils/paginate';
import styles from './CatalogPage.module.css';

export function CatalogPage() {
  const catalog = useCatalog();

  return (
    <section>
      <header className={styles.header}>
        <h1>Catalogue</h1>
        <p className={styles.subtitle}>
          Trouve une pièce à ajouter à ta garde-robe ou à tes envies.
        </p>
      </header>
      <CatalogToolbar />

      {catalog.status === 'loading' && <Loader label="Chargement du catalogue…" />}
      {catalog.status === 'error' && (
        <ErrorMessage
          title="Catalogue indisponible"
          message="Impossible de joindre le serveur. Vérifie ta connexion puis réessaie."
          onRetry={catalog.retry}
        />
      )}
      {catalog.status === 'success' && <CatalogResults pieces={catalog.data} />}
    </section>
  );
}

interface CatalogResultsProps {
  pieces: readonly Piece[];
}

/** Applique filtres + pagination (valeurs dérivées, recalculées à chaque rendu). */
function CatalogResults({ pieces }: CatalogResultsProps) {
  const { filters, setPage, resetFilters } = useCatalogFilters();

  const filteredPieces = filterPieces(pieces, filters);
  const pageCount = countPages(filteredPieces.length, PIECES_PER_PAGE);
  const page = Math.min(filters.page, pageCount);
  const visiblePieces = paginate(filteredPieces, page, PIECES_PER_PAGE);

  function goToPage(nextPage: number) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <ResultsSummary
        count={filteredPieces.length}
        canReset={hasActiveFilters(filters)}
        onReset={resetFilters}
      />

      {filteredPieces.length === 0 ? (
        <EmptyState
          title="Aucune pièce ne correspond"
          message="Essaie un autre mot-clé ou élargis les filtres."
          action={
            <button className={styles.resetButton} type="button" onClick={resetFilters}>
              Effacer les filtres
            </button>
          }
        />
      ) : (
        <PieceGrid pieces={visiblePieces} />
      )}

      <Pagination page={page} pageCount={pageCount} onPageChange={goToPage} />
    </>
  );
}
