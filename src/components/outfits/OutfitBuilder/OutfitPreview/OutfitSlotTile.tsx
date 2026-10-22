import { OUTFIT_SLOT_LABELS, type OutfitSlot } from '../../../../constants/outfits';
import type { WardrobeItem } from '../../../../types/wardrobe';
import { WardrobeItemImage } from '../../../wardrobe/ItemCard/WardrobeItemImage';
import { OwnershipTag } from '../../OwnershipTag/OwnershipTag';
import { ClearSlotButton } from './ClearSlotButton';
import styles from './OutfitSlotTile.module.css';

const EMPTY_SLOT_TEXT = 'À choisir';

interface OutfitSlotTileProps {
  slot: OutfitSlot;
  item: WardrobeItem | undefined;
  isActive: boolean;
  onSelect: (slot: OutfitSlot) => void;
  onClear: (slot: OutfitSlot) => void;
}

export function OutfitSlotTile({ slot, item, isActive, onSelect, onClear }: OutfitSlotTileProps) {
  return (
    <li className={styles.tile} data-piece-type={item?.piece.pieceType} data-status={item?.status}>
      <button
        type="button"
        className={styles.select}
        aria-pressed={isActive}
        onClick={() => onSelect(slot)}
      >
        <span className={styles.media}>
          {item ? (
            <WardrobeItemImage imageUrl={item.piece.thumbnail} />
          ) : (
            <span className={styles.plus} aria-hidden="true">
              +
            </span>
          )}
        </span>
        <span className={styles.text}>
          <span className={styles.slotLabel}>{OUTFIT_SLOT_LABELS[slot]}</span>
          <span className={styles.pieceTitle}>{item?.piece.title ?? EMPTY_SLOT_TEXT}</span>
          {item && <OwnershipTag status={item.status} />}
        </span>
      </button>
      {item && (
        <span className={styles.clear}>
          <ClearSlotButton pieceTitle={item.piece.title} onClear={() => onClear(slot)} />
        </span>
      )}
    </li>
  );
}
