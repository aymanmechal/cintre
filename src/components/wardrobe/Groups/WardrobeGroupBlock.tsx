import type { WardrobeGroup } from '../../../types/wardrobeView';
import { formatPieceCount } from '../../../utils/format';
import { WardrobeItemGrid } from '../ItemCard/WardrobeItemGrid';
import styles from './WardrobeGroupBlock.module.css';

interface WardrobeGroupBlockProps {
  group: WardrobeGroup;
  isEditing: boolean;
}

export function WardrobeGroupBlock({ group, isEditing }: WardrobeGroupBlockProps) {
  return (
    <section className={styles.group}>
      {group.title && (
        <div className={styles.heading}>
          <h2 className={styles.title}>{group.title}</h2>
          <span className={styles.count}>{formatPieceCount(group.items.length)}</span>
        </div>
      )}
      <WardrobeItemGrid items={group.items} isEditing={isEditing} />
    </section>
  );
}
