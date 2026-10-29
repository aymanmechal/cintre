import { OWNERSHIP_STATUSES, type OwnershipStatus } from '../../../wardrobe/constants/wardrobe';
import { OWNERSHIP_STATUS_CHOICE_LABELS } from '../../constants/pieceForm';
import styles from './StatusToggle.module.css';

interface StatusToggleProps {
  value: OwnershipStatus;
  onChange: (status: OwnershipStatus) => void;
}

export function StatusToggle({ value, onChange }: StatusToggleProps) {
  return (
    <div className={styles.field} role="group" aria-label="Statut">
      <span className={styles.label}>Statut</span>
      <div className={styles.choices}>
        {OWNERSHIP_STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            className={styles.choice}
            aria-pressed={value === status}
            onClick={() => onChange(status)}
          >
            {OWNERSHIP_STATUS_CHOICE_LABELS[status]}
          </button>
        ))}
      </div>
    </div>
  );
}
