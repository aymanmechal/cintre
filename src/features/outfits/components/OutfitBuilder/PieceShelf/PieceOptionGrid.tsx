import type { WardrobeItem } from '../../../../wardrobe/types/wardrobe';
import { OutfitPieceOption } from './OutfitPieceOption';
import styles from './PieceOptionGrid.module.css';

interface PieceOptionGridProps {
  items: readonly WardrobeItem[];
  selectedPieceIds: readonly number[];
  onToggle: (pieceId: number) => void;
}

export function PieceOptionGrid({ items, selectedPieceIds, onToggle }: PieceOptionGridProps) {
  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={item.piece.id}>
          <OutfitPieceOption
            item={item}
            isSelected={selectedPieceIds.includes(item.piece.id)}
            onToggle={onToggle}
          />
        </li>
      ))}
    </ul>
  );
}
