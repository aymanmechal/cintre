import { OWNERSHIP_SECTION_TITLES, type OwnershipStatus } from '../../constants/wardrobe';
import styles from './StatusTab.module.css';

interface StatusTabProps {
  status: OwnershipStatus;
  count: number;
  isSelected: boolean;
  onSelect: (status: OwnershipStatus) => void;
}

export function StatusTab({ status, count, isSelected, onSelect }: StatusTabProps) {
  return (
    <button
      type="button"
      className={`${styles.tab} ${styles[status]}`}
      aria-pressed={isSelected}
      onClick={() => onSelect(status)}
    >
      {OWNERSHIP_SECTION_TITLES[status]}
      <span className={styles.count}>{count}</span>
    </button>
  );
}
