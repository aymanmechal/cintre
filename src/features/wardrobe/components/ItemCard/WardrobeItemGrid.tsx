import type { WardrobeItem } from '../../types/wardrobe';
import { WardrobeItemCard } from './WardrobeItemCard';
import styles from './WardrobeItemGrid.module.css';

interface WardrobeItemGridProps {
  items: readonly WardrobeItem[];
  isEditing: boolean;
}

export function WardrobeItemGrid({ items, isEditing }: WardrobeItemGridProps) {
  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={item.piece.id}>
          <WardrobeItemCard item={item} isEditing={isEditing} />
        </li>
      ))}
    </ul>
  );
}
