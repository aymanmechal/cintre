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
      <div className={styles.controls}>
        <WardrobeTypeSelect value={view.pieceType} onChange={viewState.changePieceType} />
        <WardrobeSortSelect value={view.sortOrder} onChange={viewState.changeSortOrder} />
        <WardrobeGroupingSelect
          status={view.status}
          value={view.grouping}
          onChange={viewState.changeGrouping}
        />
        <EditModeButton isEditing={viewState.isEditing} onToggle={viewState.toggleEditing} />
        <SelectModeButton
          isSelecting={selection.isSelecting}
          onToggle={selection.toggleSelecting}
        />
      </div>
      <div className={styles.filters}>
        <WardrobeSearchField value={view.search} onChange={viewState.changeSearch} />
        <WardrobeMoreFilters viewState={viewState} />
      </div>
    </div>
  );
}
