import type { WardrobeItem } from '../../../../types/wardrobe';
import { OutfitPieceOption } from './OutfitPieceOption';
import styles from './PieceOptionGrid.module.css';

interface PieceOptionGridProps {
  items: readonly WardrobeItem[];
  selectedPieceId: number | null;
  onToggle: (pieceId: number) => void;
}

export function PieceOptionGrid({ items, selectedPieceId, onToggle }: PieceOptionGridProps) {
  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={item.piece.id}>
          <OutfitPieceOption
            item={item}
            isSelected={item.piece.id === selectedPieceId}
            onToggle={onToggle}
          />
        </li>
      ))}
    </ul>
  );
}
