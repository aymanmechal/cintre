import { OWNERSHIP_STATUSES, type OwnershipStatus } from '../../../constants/wardrobe';
import { StatusTab } from './StatusTab';
import styles from './StatusTabs.module.css';

interface StatusTabsProps {
  selectedStatus: OwnershipStatus;
  countOfStatus: (status: OwnershipStatus) => number;
  onSelect: (status: OwnershipStatus) => void;
}

export function StatusTabs({ selectedStatus, countOfStatus, onSelect }: StatusTabsProps) {
  return (
    <div className={styles.tabs} role="group" aria-label="Afficher">
      {OWNERSHIP_STATUSES.map((status) => (
        <StatusTab
          key={status}
          status={status}
          count={countOfStatus(status)}
          isSelected={status === selectedStatus}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
