import type { WardrobeItem } from '../../types/wardrobe';
import type { WardrobeSelection } from '../../hooks/useWardrobeSelection';
import { WardrobeItemCard } from './WardrobeItemCard';
import styles from './WardrobeItemGrid.module.css';

interface WardrobeItemGridProps {
  items: readonly WardrobeItem[];
  isEditing: boolean;
  selection: WardrobeSelection;
}

export function WardrobeItemGrid({ items, isEditing, selection }: WardrobeItemGridProps) {
  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={item.piece.id}>
          <WardrobeItemCard item={item} isEditing={isEditing} selection={selection} />
        </li>
      ))}
    </ul>
  );
}
