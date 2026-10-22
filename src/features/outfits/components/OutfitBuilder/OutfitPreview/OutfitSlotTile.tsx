import type { OutfitSlot } from '../../../constants/outfits';
import type { WardrobeItem } from '../../../../wardrobe/types/wardrobe';
import { AddAnotherPieceButton } from './AddAnotherPieceButton';
import { OutfitSlotRow } from './OutfitSlotRow';
import styles from './OutfitSlotTile.module.css';

interface OutfitSlotTileProps {
  slot: OutfitSlot;
  items: readonly WardrobeItem[];
  isActive: boolean;
  canAddAnother: boolean;
  onSelect: (slot: OutfitSlot) => void;
  onClear: (slot: OutfitSlot, pieceId: number) => void;
}

export function OutfitSlotTile({
  slot,
  items,
  isActive,
  canAddAnother,
  onSelect,
  onClear,
}: OutfitSlotTileProps) {
  return (
    <li className={styles.tile}>
      {items.length === 0 ? (
        <OutfitSlotRow
          slot={slot}
          item={undefined}
          isActive={isActive}
          onSelect={onSelect}
          onClear={onClear}
        />
      ) : (
        items.map((item) => (
          <OutfitSlotRow
            key={item.piece.id}
            slot={slot}
            item={item}
            isActive={isActive}
            onSelect={onSelect}
            onClear={onClear}
          />
        ))
      )}
      {canAddAnother && <AddAnotherPieceButton onClick={() => onSelect(slot)} />}
    </li>
  );
}
