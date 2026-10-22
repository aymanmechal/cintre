import { EmptyWardrobe } from '../components/EmptyWardrobe/EmptyWardrobe';
import { WardrobeHeader } from '../components/WardrobeHeader/WardrobeHeader';
import { WardrobeResults } from '../components/WardrobeResults/WardrobeResults';
import { WardrobeToolbar } from '../components/Toolbar/WardrobeToolbar';
import { useWardrobe } from '../context/useWardrobe';
import { useWardrobeView } from '../hooks/useWardrobeView';
import { formatPageTitle } from '../../../shared/utils/format';

export function WardrobePage() {
  const { items } = useWardrobe();
  const viewState = useWardrobeView();

  return (
    <section>
      <title>{formatPageTitle('Ma garde-robe')}</title>
      <WardrobeHeader />
      {items.length === 0 ? (
        <EmptyWardrobe />
      ) : (
        <>
          <WardrobeToolbar viewState={viewState} />
          <WardrobeResults viewState={viewState} />
        </>
      )}
    </section>
  );
}
