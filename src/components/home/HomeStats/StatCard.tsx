import { Link } from 'react-router';
import { StatTone } from './statTone';
import styles from './StatCard.module.css';

interface StatCardProps {
  value: number;
  label: string;
  to: string;
  tone: StatTone;
}

export function StatCard({ value, label, to, tone }: StatCardProps) {
  return (
    <Link className={`${styles.card} ${styles[tone]}`} to={to}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </Link>
  );
}
