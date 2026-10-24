import type { WardrobeGroup } from '../../types/wardrobeView';
import type { WardrobeSelection } from '../../hooks/useWardrobeSelection';
import { WardrobeGroupBlock } from './WardrobeGroupBlock';
import styles from './WardrobeGroupList.module.css';

interface WardrobeGroupListProps {
  groups: readonly WardrobeGroup[];
  isEditing: boolean;
  selection: WardrobeSelection;
}

export function WardrobeGroupList({ groups, isEditing, selection }: WardrobeGroupListProps) {
  return (
    <div className={styles.list}>
      {groups.map((group) => (
        <WardrobeGroupBlock
          key={group.id}
          group={group}
          isEditing={isEditing}
          selection={selection}
        />
      ))}
    </div>
  );
}
