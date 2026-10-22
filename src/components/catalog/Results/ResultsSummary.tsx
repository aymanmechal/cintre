import { useCatalogFilters } from '../../../contexts/catalogFilters/useCatalogFilters';
import { hasActiveFilters } from '../../../utils/filterPieces';
import { formatFoundPiecesCount } from '../../../utils/format';
import { ButtonVariant } from '../../ui/Button/buttonVariant';
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
