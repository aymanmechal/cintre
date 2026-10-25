import type { WardrobeSelection } from '../../hooks/useWardrobeSelection';
import type { WardrobeViewState } from '../../hooks/useWardrobeView';
import { EditModeButton } from './EditModeButton';
import { SelectModeButton } from './SelectModeButton';
import { StatusTabs } from './StatusTabs';
import { WardrobeMoreFilters } from './WardrobeMoreFilters';
import { WardrobeSearchField } from './WardrobeSearchField';
import { WardrobeGroupingSelect } from './WardrobeGroupingSelect';
import { WardrobeSortSelect } from './WardrobeSortSelect';
import { WardrobeTypeSelect } from './WardrobeTypeSelect';
import styles from './WardrobeToolbar.module.css';

interface WardrobeToolbarProps {
  viewState: WardrobeViewState;
  selection: WardrobeSelection;
}

export function WardrobeToolbar({ viewState, selection }: WardrobeToolbarProps) {
  const { view } = viewState;

  return (
    <div className={styles.toolbar}>
      <StatusTabs
        selectedStatus={view.status}
        countOfStatus={viewState.countOfStatus}
        onSelect={viewState.changeStatus}
      />
      <WardrobeSearchField value={view.search} onChange={viewState.changeSearch} />
      <div className={styles.selects}>
        <WardrobeTypeSelect value={view.pieceType} onChange={viewState.changePieceType} />
        <WardrobeSortSelect value={view.sortOrder} onChange={viewState.changeSortOrder} />
        <WardrobeGroupingSelect
          status={view.status}
          value={view.grouping}
          onChange={viewState.changeGrouping}
        />
      </div>
      <WardrobeMoreFilters viewState={viewState} />
      <div className={styles.actions}>
        <EditModeButton isEditing={viewState.isEditing} onToggle={viewState.toggleEditing} />
        <SelectModeButton
          isSelecting={selection.isSelecting}
          onToggle={selection.toggleSelecting}
        />
      </div>
    </div>
  );
}
