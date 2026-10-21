import styles from './ResultsSummary.module.css';

interface ResultsSummaryProps {
  count: number;
  canReset: boolean;
  onReset: () => void;
}

/** aria-live : le nombre de résultats est annoncé quand il change. */
export function ResultsSummary({ count, canReset, onReset }: ResultsSummaryProps) {
  return (
    <div className={styles.summary}>
      <p aria-live="polite">
        <strong>{count}</strong> {count > 1 ? 'pièces trouvées' : 'pièce trouvée'}
      </p>
      {canReset && (
        <button className={styles.reset} type="button" onClick={onReset}>
          Effacer les filtres
        </button>
      )}
    </div>
  );
}
