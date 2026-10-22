import { STORAGE_LOCATION_LABELS } from '../../../constants/wardrobe';
import type { LocationGroup } from '../../../types/wardrobe';
import { WardrobeItemGrid } from '../ItemCard/WardrobeItemGrid';
import styles from './LocationGroupBlock.module.css';

interface LocationGroupBlockProps {
  group: LocationGroup;
}

export function LocationGroupBlock({ group }: LocationGroupBlockProps) {
  return (
    <div className={styles.group}>
      <h3 className={styles.location}>{STORAGE_LOCATION_LABELS[group.location]}</h3>
      <WardrobeItemGrid items={group.items} />
    </div>
  );
}
