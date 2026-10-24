import { Button, ButtonVariant } from '../Button/Button';
import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function Pagination({ page, pageCount, onPrevious, onNext }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <Button variant={ButtonVariant.Ghost} disabled={page <= 1} onClick={onPrevious}>
        ← Précédent
      </Button>
      <p className={styles.position}>
        Page {page} sur {pageCount}
      </p>
      <Button variant={ButtonVariant.Ghost} disabled={page >= pageCount} onClick={onNext}>
        Suivant →
      </Button>
    </nav>
  );
}
