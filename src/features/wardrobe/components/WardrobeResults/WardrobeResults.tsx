import type { WardrobeViewState } from '../../hooks/useWardrobeView';
import { useToday } from '../../../../shared/hooks/useToday';
import type { WardrobeSelection } from '../../hooks/useWardrobeSelection';
import { useWardrobe } from '../../context/useWardrobe';
import { OwnershipStatus } from '../../constants/wardrobe';
import { WardrobeSortOrder } from '../../constants/wardrobeView';
import { countForgottenItems } from '../../utils/wornDates';
import { ForgottenReminder } from '../ForgottenReminder/ForgottenReminder';
import { EmptyStatusTab } from '../EmptyWardrobe/EmptyStatusTab';
import { NoMatchingWardrobeItems } from '../EmptyWardrobe/NoMatchingWardrobeItems';
import { WardrobeGroupList } from '../Groups/WardrobeGroupList';

interface WardrobeResultsProps {
  viewState: WardrobeViewState;
  selection: WardrobeSelection;
}

export function WardrobeResults({ viewState, selection }: WardrobeResultsProps) {
  const { view, groups } = viewState;
  const { items } = useWardrobe();
  const today = useToday();
  const forgottenCount = countForgottenItems(items, today);
  const shouldRemindForgotten =
    view.status === OwnershipStatus.Owned &&
    forgottenCount > 0 &&
    view.sortOrder !== WardrobeSortOrder.LeastRecentlyWorn;

  if (viewState.countOfStatus(view.status) === 0) {
    return <EmptyStatusTab status={view.status} />;
  }

  if (groups.length === 0) {
    return <NoMatchingWardrobeItems onResetFilters={viewState.resetFilters} />;
  }

  return (
    <>
      {shouldRemindForgotten && (
        <ForgottenReminder
          forgottenCount={forgottenCount}
          onShowForgotten={viewState.changeSortOrder}
        />
      )}
      <WardrobeGroupList groups={groups} selection={selection} />
    </>
  );
}
