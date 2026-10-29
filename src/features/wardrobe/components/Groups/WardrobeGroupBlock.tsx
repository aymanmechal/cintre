import type { WardrobeGroup } from '../../types/wardrobeView';
import { formatPieceCount } from '../../../../shared/utils/format';
import type { WardrobeSelection } from '../../hooks/useWardrobeSelection';
import { WardrobeItemGrid } from '../ItemCard/WardrobeItemGrid';
import styles from './WardrobeGroupBlock.module.css';

interface WardrobeGroupBlockProps {
  group: WardrobeGroup;
  selection: WardrobeSelection;
}

export function WardrobeGroupBlock({ group, selection }: WardrobeGroupBlockProps) {
  return (
    <section className={styles.group}>
      {group.title && (
        <div className={styles.heading}>
          <h2 className={styles.title}>{group.title}</h2>
          <span className={styles.count}>{formatPieceCount(group.items.length)}</span>
        </div>
      )}
      <WardrobeItemGrid items={group.items} selection={selection} />
    </section>
  );
}
