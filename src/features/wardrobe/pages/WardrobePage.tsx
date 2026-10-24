import { EmptyWardrobe } from '../components/EmptyWardrobe/EmptyWardrobe';
import { TrashLink } from '../components/TrashLink/TrashLink';
import { WardrobeHeader } from '../components/WardrobeHeader/WardrobeHeader';
import { WardrobeResults } from '../components/WardrobeResults/WardrobeResults';
import { WardrobeToolbar } from '../components/Toolbar/WardrobeToolbar';
import { useWardrobe } from '../context/useWardrobe';
import { SelectionBar } from '../components/SelectionBar/SelectionBar';
import { useWardrobeSelection } from '../hooks/useWardrobeSelection';
import { useWardrobeView } from '../hooks/useWardrobeView';
import { formatPageTitle } from '../../../shared/utils/format';

export function WardrobePage() {
  const { items } = useWardrobe();
  const viewState = useWardrobeView();
  const selection = useWardrobeSelection(viewState.groups.flatMap((group) => group.items));

  return (
    <section>
      <title>{formatPageTitle('Ma garde-robe')}</title>
      <WardrobeHeader />
      <TrashLink />
      {items.length === 0 ? (
        <EmptyWardrobe />
      ) : (
        <>
          <WardrobeToolbar viewState={viewState} selection={selection} />
          <SelectionBar selection={selection} />
          <WardrobeResults viewState={viewState} selection={selection} />
        </>
      )}
    </section>
  );
}
