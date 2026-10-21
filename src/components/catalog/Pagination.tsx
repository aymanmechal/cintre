import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

function pageNumbers(pageCount: number): number[] {
  return Array.from({ length: pageCount }, (_, index) => index + 1);
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        className={styles.step}
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        ← Précédent
      </button>

      <ul className={styles.pages}>
        {pageNumbers(pageCount).map((number) => (
          <li key={number}>
            <button
              className={styles.number}
              type="button"
              onClick={() => onPageChange(number)}
              aria-current={number === page ? 'page' : undefined}
              aria-label={`Page ${number}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>

      <button
        className={styles.step}
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
      >
        Suivant →
      </button>
    </nav>
  );
}
