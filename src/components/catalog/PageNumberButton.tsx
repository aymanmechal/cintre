import styles from './PageNumberButton.module.css';

interface PageNumberButtonProps {
  pageNumber: number;
  isCurrent: boolean;
  onClick: () => void;
}

export function PageNumberButton({ pageNumber, isCurrent, onClick }: PageNumberButtonProps) {
  return (
    <button
      className={styles.pageNumber}
      type="button"
      aria-current={isCurrent ? 'page' : undefined}
      aria-label={`Page ${pageNumber}`}
      onClick={onClick}
    >
      {pageNumber}
    </button>
  );
}
