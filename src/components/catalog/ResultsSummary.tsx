import { useCatalogFilters } from '../../contexts/catalogFilters/useCatalogFilters';
import { hasActiveFilters } from '../../utils/filterPieces';
import { formatFoundPiecesCount } from '../../utils/format';
import styles from './ResultsSummary.module.css';

interface ResultsSummaryProps {
  matchingCount: number;
}

export function ResultsSummary({ matchingCount }: ResultsSummaryProps) {
  const { filters, resetFilters } = useCatalogFilters();

  return (
    <div className={styles.summary}>
      <p aria-live="polite">{formatFoundPiecesCount(matchingCount)}</p>
      {hasActiveFilters(filters) && (
        <button className={styles.reset} type="button" onClick={resetFilters}>
          Effacer les filtres
        </button>
      )}
    </div>
  );
}
