import type { WardrobeSelection } from '../../hooks/useWardrobeSelection';
import type { WardrobeViewState } from '../../hooks/useWardrobeView';
import { WardrobeTypeChips } from '../TypeChips/WardrobeTypeChips';
import { SelectModeButton } from './SelectModeButton';
import { StatusTabs } from './StatusTabs';
import { WardrobeMoreFilters } from './WardrobeMoreFilters';
import { WardrobeSearchField } from './WardrobeSearchField';
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
      <WardrobeTypeChips
        selectedTypes={view.pieceTypes}
        onToggle={viewState.togglePieceType}
        onClear={viewState.clearPieceTypes}
      />
      <div className={styles.actions}>
        <WardrobeMoreFilters viewState={viewState} />
        <SelectModeButton
          isSelecting={selection.isSelecting}
          onToggle={selection.toggleSelecting}
        />
      </div>
    </div>
  );
}
