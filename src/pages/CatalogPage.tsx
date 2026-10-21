import { useState } from 'react';
import { Pagination } from '../components/catalog/Pagination';
import { PieceGrid } from '../components/catalog/PieceGrid';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Loader } from '../components/ui/Loader';
import { PIECES_PER_PAGE } from '../constants/catalog';
import { useCatalog } from '../hooks/useCatalog';
import { countPages, paginate } from '../utils/paginate';
import styles from './CatalogPage.module.css';

export function CatalogPage() {
  const catalog = useCatalog();
  const [page, setPage] = useState(1);

  if (catalog.status === 'loading') {
    return <Loader label="Chargement du catalogue…" />;
  }

  if (catalog.status === 'error') {
    return (
      <ErrorMessage
        title="Catalogue indisponible"
        message="Impossible de joindre le serveur. Vérifie ta connexion puis réessaie."
        onRetry={catalog.retry}
      />
    );
  }

  const pieces = catalog.data;
  const pageCount = countPages(pieces.length, PIECES_PER_PAGE);
  const visiblePieces = paginate(pieces, page, PIECES_PER_PAGE);

  function goToPage(nextPage: number) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <section>
      <header className={styles.header}>
        <h1>Catalogue</h1>
        <p className={styles.count}>
          {pieces.length} pièces · page {page} sur {pageCount}
        </p>
      </header>

      {pieces.length === 0 ? (
        <EmptyState title="Aucune pièce" message="Le catalogue est vide pour le moment." />
      ) : (
        <PieceGrid pieces={visiblePieces} />
      )}

      <Pagination page={page} pageCount={pageCount} onPageChange={goToPage} />
    </section>
  );
}
