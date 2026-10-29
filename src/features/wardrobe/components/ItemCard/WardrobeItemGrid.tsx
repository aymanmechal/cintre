import type { WardrobeItem } from '../../types/wardrobe';
import type { WardrobeSelection } from '../../hooks/useWardrobeSelection';
import { WardrobeItemCard } from './WardrobeItemCard';
import styles from './WardrobeItemGrid.module.css';

interface WardrobeItemGridProps {
  items: readonly WardrobeItem[];
  selection: WardrobeSelection;
}

export function WardrobeItemGrid({ items, selection }: WardrobeItemGridProps) {
  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={item.piece.id}>
          <WardrobeItemCard item={item} selection={selection} />
        </li>
      ))}
    </ul>
  );
}
