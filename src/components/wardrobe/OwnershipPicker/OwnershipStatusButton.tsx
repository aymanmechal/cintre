import { OWNERSHIP_STATUS_LABELS, type OwnershipStatus } from '../../../constants/wardrobe';
import styles from './OwnershipStatusButton.module.css';

interface OwnershipStatusButtonProps {
  status: OwnershipStatus;
  isSelected: boolean;
  onSelect: (status: OwnershipStatus) => void;
}

export function OwnershipStatusButton({
  status,
  isSelected,
  onSelect,
}: OwnershipStatusButtonProps) {
  return (
    <button
      type="button"
      className={styles.statusButton}
      aria-pressed={isSelected}
      onClick={() => onSelect(status)}
    >
      {OWNERSHIP_STATUS_LABELS[status]}
    </button>
  );
}
