import { PageNumberList } from './PageNumberList';
import { PaginationStep } from './paginationStep';
import { PaginationStepButton } from './PaginationStepButton';
import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <PaginationStepButton
        step={PaginationStep.Previous}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      />
      <PageNumberList page={page} pageCount={pageCount} onPageChange={onPageChange} />
      <PaginationStepButton
        step={PaginationStep.Next}
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      />
    </nav>
  );
}
