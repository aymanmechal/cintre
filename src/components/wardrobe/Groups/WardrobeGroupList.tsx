import type { WardrobeGroup } from '../../../types/wardrobeView';
import { WardrobeGroupBlock } from './WardrobeGroupBlock';
import styles from './WardrobeGroupList.module.css';

interface WardrobeGroupListProps {
  groups: readonly WardrobeGroup[];
}

export function WardrobeGroupList({ groups }: WardrobeGroupListProps) {
  return (
    <div className={styles.list}>
      {groups.map((group) => (
        <WardrobeGroupBlock key={group.id} group={group} />
      ))}
    </div>
  );
}
