import { EmptyWardrobe } from '../components/wardrobe/EmptyWardrobe/EmptyWardrobe';
import { WardrobeHeader } from '../components/wardrobe/WardrobeHeader/WardrobeHeader';
import { WardrobeResults } from '../components/wardrobe/WardrobeResults/WardrobeResults';
import { WardrobeToolbar } from '../components/wardrobe/Toolbar/WardrobeToolbar';
import { useWardrobe } from '../contexts/wardrobe/useWardrobe';
import { useWardrobeView } from '../hooks/useWardrobeView';
import { formatPageTitle } from '../utils/format';

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
