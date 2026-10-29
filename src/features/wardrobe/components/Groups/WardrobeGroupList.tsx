import type { WardrobeGroup } from '../../types/wardrobeView';
import type { WardrobeSelection } from '../../hooks/useWardrobeSelection';
import { WardrobeGroupBlock } from './WardrobeGroupBlock';
import styles from './WardrobeGroupList.module.css';

interface WardrobeGroupListProps {
  groups: readonly WardrobeGroup[];
  selection: WardrobeSelection;
}

export function WardrobeGroupList({ groups, selection }: WardrobeGroupListProps) {
  return (
    <div className={styles.list}>
      {groups.map((group) => (
        <WardrobeGroupBlock key={group.id} group={group} selection={selection} />
      ))}
    </div>
  );
}
