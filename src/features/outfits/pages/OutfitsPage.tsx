import { OutfitsHeader } from '../components/OutfitsHeader/OutfitsHeader';
import { OutfitsWorkspace } from '../components/OutfitsWorkspace/OutfitsWorkspace';
import { EmptyWardrobe } from '../../wardrobe/components/EmptyWardrobe/EmptyWardrobe';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { formatPageTitle } from '../../../shared/utils/format';

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
