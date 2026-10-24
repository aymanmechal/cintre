import { formatPrice } from '../../../../shared/utils/format';
import type { WardrobeStats } from '../../types/stats';
import styles from './StatsSummary.module.css';

interface StatsSummaryProps {
  stats: WardrobeStats;
}

export function StatsSummary({ stats }: StatsSummaryProps) {
  const average = stats.averageCostPerWear === null ? '—' : formatPrice(stats.averageCostPerWear);

  return (
    <dl className={styles.summary}>
      <div className={styles.card}>
        <dd className={styles.value}>{formatPrice(stats.totalSpent)}</dd>
        <dt className={styles.label}>dépensés pour {stats.ownedCount} pièces</dt>
      </div>
      <div className={styles.card}>
        <dd className={styles.value}>{average}</dd>
        <dt className={styles.label}>par port en moyenne</dt>
      </div>
      <div className={styles.card}>
        <dd className={styles.value}>{stats.neverWornCount}</dd>
        <dt className={styles.label}>jamais portées</dt>
      </div>
    </dl>
  );
}
