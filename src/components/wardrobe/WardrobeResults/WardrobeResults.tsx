import { ALL_PIECE_TYPES } from '../../../contexts/catalogFilters/catalogFiltersReducer';
import type { WardrobeViewState } from '../../../hooks/useWardrobeView';
import { EmptyStatusTab } from '../EmptyWardrobe/EmptyStatusTab';
import { NoMatchingWardrobeItems } from '../EmptyWardrobe/NoMatchingWardrobeItems';
import { WardrobeGroupList } from '../Groups/WardrobeGroupList';

interface WardrobeResultsProps {
  viewState: WardrobeViewState;
}

export function WardrobeResults({ viewState }: WardrobeResultsProps) {
  const { view, groups } = viewState;

  if (viewState.countOfStatus(view.status) === 0) {
    return <EmptyStatusTab status={view.status} />;
  }

  if (groups.length === 0) {
    return (
      <NoMatchingWardrobeItems onShowAllTypes={() => viewState.changePieceType(ALL_PIECE_TYPES)} />
    );
  }

  return <WardrobeGroupList groups={groups} />;
}
