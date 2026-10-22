import type { WardrobeItem } from '../../../types/wardrobe';
import { WardrobeItemImage } from '../../wardrobe/ItemCard/WardrobeItemImage';
import { OwnershipTag } from '../OwnershipTag/OwnershipTag';
import styles from './OutfitPieceOption.module.css';

interface OutfitPieceOptionProps {
  item: WardrobeItem;
  isSelected: boolean;
  onToggle: () => void;
}

export function OutfitPieceOption({ item, isSelected, onToggle }: OutfitPieceOptionProps) {
  const { piece } = item;

  return (
    <button
      className={styles.option}
      type="button"
      data-piece-type={piece.pieceType}
      aria-pressed={isSelected}
      onClick={onToggle}
    >
      <span className={styles.media}>
        <WardrobeItemImage imageUrl={piece.thumbnail} />
      </span>
      <span className={styles.title}>{piece.title}</span>
      <OwnershipTag status={item.status} />
    </button>
  );
}
