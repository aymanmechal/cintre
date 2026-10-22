import { OUTFIT_SLOT_LABELS, type OutfitSlot } from '../../../constants/outfits';
import styles from './SlotTab.module.css';

interface SlotTabProps {
  slot: OutfitSlot;
  count: number;
  isActive: boolean;
  onSelect: (slot: OutfitSlot) => void;
}

export function SlotTab({ slot, count, isActive, onSelect }: SlotTabProps) {
  return (
    <button
      type="button"
      className={styles.tab}
      aria-pressed={isActive}
      onClick={() => onSelect(slot)}
    >
      {OUTFIT_SLOT_LABELS[slot]}
      <span className={styles.count}>{count}</span>
    </button>
  );
}
