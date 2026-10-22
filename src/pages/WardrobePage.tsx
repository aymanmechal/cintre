import { WardrobeContent } from '../components/wardrobe/WardrobeContent/WardrobeContent';
import { useWardrobe } from '../contexts/wardrobe/useWardrobe';
import { formatPageTitle } from '../utils/format';

export function WardrobePage() {
  const { items } = useWardrobe();

  return (
    <section>
      <title>{formatPageTitle('Ma garde-robe')}</title>
      <WardrobeContent items={items} />
    </section>
  );
}
