import { PageHeader } from '../../../shared/ui/PageHeader/PageHeader';
import { formatPageTitle } from '../../../shared/utils/format';
import { ShopGrid } from '../components/ShopGrid/ShopGrid';

export function ShopsPage() {
  return (
    <section>
      <title>{formatPageTitle('Catalogue')}</title>
      <PageHeader
        title="Catalogue"
        subtitle="Choisis une boutique pour trouver ta prochaine envie."
      />
      <ShopGrid />
    </section>
  );
}
