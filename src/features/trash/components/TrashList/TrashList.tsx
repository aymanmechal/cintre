import type { TrashedItem } from '../../../wardrobe/types/wardrobe';
import { TrashedItemCard } from '../TrashedItemCard/TrashedItemCard';
import styles from './TrashList.module.css';

interface TrashListProps {
  trash: TrashedItem[];
  today: Date;
  onRestore: (pieceId: number) => void;
}

export function TrashList({ trash, today, onRestore }: TrashListProps) {
  return (
    <ul className={styles.grid}>
      {trash.map((trashedItem) => (
        <li key={trashedItem.item.piece.id}>
          <TrashedItemCard trashedItem={trashedItem} today={today} onRestore={onRestore} />
        </li>
      ))}
    </ul>
  );
}
