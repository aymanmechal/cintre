import { AVAILABILITY_LABELS, Availability, OwnershipStatus } from '../../constants/wardrobe';
import type { WardrobeItem } from '../../types/wardrobe';
import styles from './AvailabilityTag.module.css';

interface AvailabilityTagProps {
  item: WardrobeItem;
}

export function AvailabilityTag({ item }: AvailabilityTagProps) {
  if (item.status !== OwnershipStatus.Owned || item.availability === Availability.Available) {
    return null;
  }

  return <p className={styles.tag}>{AVAILABILITY_LABELS[item.availability]}</p>;
}
