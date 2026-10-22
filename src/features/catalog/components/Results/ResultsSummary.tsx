import { useCatalogFilters } from '../../context/useCatalogFilters';
import { hasActiveFilters } from '../../utils/filterPieces';
import { formatFoundPiecesCount } from '../../../../shared/utils/format';
import { ButtonVariant } from '../../../../shared/ui/Button/Button';
import { ResetFiltersButton } from '../Filters/ResetFiltersButton';
import styles from './ResultsSummary.module.css';

interface ResultsSummaryProps {
  matchingCount: number;
}

export function ResultsSummary({ matchingCount }: ResultsSummaryProps) {
  const { filters } = useCatalogFilters();

  return (
    <div className={styles.summary}>
      <p aria-live="polite">{formatFoundPiecesCount(matchingCount)}</p>
      {hasActiveFilters(filters) && <ResetFiltersButton variant={ButtonVariant.Ghost} />}
    </div>
  );
}
