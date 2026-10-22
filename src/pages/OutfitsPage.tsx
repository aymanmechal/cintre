import { OutfitsHeader } from '../components/outfits/OutfitsHeader/OutfitsHeader';
import { OutfitsWorkspace } from '../components/outfits/OutfitsWorkspace/OutfitsWorkspace';
import { EmptyWardrobe } from '../components/wardrobe/EmptyWardrobe/EmptyWardrobe';
import { useWardrobe } from '../contexts/wardrobe/useWardrobe';
import { formatPageTitle } from '../utils/format';

export function OutfitsPage() {
  const { items } = useWardrobe();

  return (
    <section>
      <title>{formatPageTitle('Mes tenues')}</title>
      <OutfitsHeader />
      {items.length === 0 ? <EmptyWardrobe /> : <OutfitsWorkspace />}
    </section>
  );
}
