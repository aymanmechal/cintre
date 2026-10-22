import type { WardrobeGroup } from '../../../types/wardrobeView';
import { WardrobeGroupBlock } from './WardrobeGroupBlock';
import styles from './WardrobeGroupList.module.css';

interface WardrobeGroupListProps {
  groups: readonly WardrobeGroup[];
  isEditing: boolean;
}

export function WardrobeGroupList({ groups, isEditing }: WardrobeGroupListProps) {
  return (
    <div className={styles.list}>
      {groups.map((group) => (
        <WardrobeGroupBlock key={group.id} group={group} isEditing={isEditing} />
      ))}
    </div>
  );
}
