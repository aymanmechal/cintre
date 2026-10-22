import { OUTFIT_SLOTS, type OutfitSlot } from '../../../constants/outfits';
import { SlotTab } from './SlotTab';
import styles from './SlotTabs.module.css';

interface SlotTabsProps {
  activeSlot: OutfitSlot;
  countOfSlot: (slot: OutfitSlot) => number;
  onSelect: (slot: OutfitSlot) => void;
}

export function SlotTabs({ activeSlot, countOfSlot, onSelect }: SlotTabsProps) {
  return (
    <div className={styles.tabs} role="group" aria-label="Type de pièce">
      {OUTFIT_SLOTS.map((slot) => (
        <SlotTab
          key={slot}
          slot={slot}
          count={countOfSlot(slot)}
          isActive={slot === activeSlot}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
