import { OUTFIT_SLOT_LABELS, type OutfitSlot } from '../../../constants/outfits';
import type { WardrobeItem } from '../../../types/wardrobe';
import { FormSection } from '../../ui/Form/FormSection';
import { OutfitPieceOption } from './OutfitPieceOption';
import styles from './OutfitSlotPicker.module.css';

interface OutfitSlotPickerProps {
  slot: OutfitSlot;
  items: readonly WardrobeItem[];
  selectedPieceId: number | null;
  onToggle: (slot: OutfitSlot, pieceId: number) => void;
}

export function OutfitSlotPicker({
  slot,
  items,
  selectedPieceId,
  onToggle,
}: OutfitSlotPickerProps) {
  return (
    <FormSection legend={OUTFIT_SLOT_LABELS[slot]}>
      {items.length === 0 ? (
        <p className={styles.empty}>Aucune pièce de ce type dans ta garde-robe.</p>
      ) : (
        <ul className={styles.options}>
          {items.map((item) => (
            <li key={item.piece.id}>
              <OutfitPieceOption
                item={item}
                isSelected={item.piece.id === selectedPieceId}
                onToggle={() => onToggle(slot, item.piece.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </FormSection>
  );
}
