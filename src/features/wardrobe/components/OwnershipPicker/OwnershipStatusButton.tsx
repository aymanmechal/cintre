import {
  OWNERSHIP_STATUS_ICONS,
  OWNERSHIP_STATUS_LABELS,
  type OwnershipStatus,
} from '../../constants/wardrobe';
import type { OwnershipPickerSize } from './ownershipPickerSize';
import styles from './OwnershipStatusButton.module.css';

interface OwnershipStatusButtonProps {
  status: OwnershipStatus;
  size: OwnershipPickerSize;
  pieceTitle: string;
  isSelected: boolean;
  onToggle: (status: OwnershipStatus) => void;
}

export function OwnershipStatusButton({
  status,
  size,
  pieceTitle,
  isSelected,
  onToggle,
}: OwnershipStatusButtonProps) {
  const label = OWNERSHIP_STATUS_LABELS[status];
  const classNames = [styles.statusButton, styles[status], styles[size]].join(' ');
  const accessibleLabel = isSelected
    ? `Retirer ${pieceTitle} de « ${label} »`
    : `Marquer ${pieceTitle} comme « ${label} »`;

  return (
    <button
      type="button"
      className={classNames}
      aria-pressed={isSelected}
      aria-label={accessibleLabel}
      title={accessibleLabel}
      onClick={() => onToggle(status)}
    >
      <span aria-hidden="true">{OWNERSHIP_STATUS_ICONS[status]}</span>
      {label}
    </button>
  );
}
