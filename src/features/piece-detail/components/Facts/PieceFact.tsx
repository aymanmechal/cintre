import styles from './PieceFact.module.css';

interface PieceFactProps {
  label: string;
  value: string;
}

export function PieceFact({ label, value }: PieceFactProps) {
  return (
    <div className={styles.fact}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>{value}</dd>
    </div>
  );
}
