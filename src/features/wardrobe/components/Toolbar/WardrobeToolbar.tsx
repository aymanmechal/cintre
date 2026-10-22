import type { WardrobeViewState } from '../../hooks/useWardrobeView';
import { EditModeButton } from './EditModeButton';
import { StatusTabs } from './StatusTabs';
import { WardrobeGroupingSelect } from './WardrobeGroupingSelect';
import { WardrobeSortSelect } from './WardrobeSortSelect';
import { WardrobeTypeSelect } from './WardrobeTypeSelect';
import styles from './WardrobeToolbar.module.css';

interface WardrobeToolbarProps {
  viewState: WardrobeViewState;
}

export function WardrobeToolbar({ viewState }: WardrobeToolbarProps) {
  const { view } = viewState;

  return (
    <div className={styles.toolbar}>
      <StatusTabs
        selectedStatus={view.status}
        countOfStatus={viewState.countOfStatus}
        onSelect={viewState.changeStatus}
      />
      <div className={styles.controls}>
        <WardrobeTypeSelect value={view.pieceType} onChange={viewState.changePieceType} />
        <WardrobeSortSelect value={view.sortOrder} onChange={viewState.changeSortOrder} />
        <WardrobeGroupingSelect
          status={view.status}
          value={view.grouping}
          onChange={viewState.changeGrouping}
        />
        <EditModeButton isEditing={viewState.isEditing} onToggle={viewState.toggleEditing} />
      </div>
    </div>
  );
}
