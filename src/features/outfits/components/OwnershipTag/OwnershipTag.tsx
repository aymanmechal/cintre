import {
  OWNERSHIP_STATUS_LABELS,
  type OwnershipStatus,
} from '../../../wardrobe/constants/wardrobe';
import styles from './OwnershipTag.module.css';

interface OwnershipTagProps {
  status: OwnershipStatus;
}

export function OwnershipTag({ status }: OwnershipTagProps) {
  return (
    <span className={`${styles.tag} ${styles[status]}`}>{OWNERSHIP_STATUS_LABELS[status]}</span>
  );
}
