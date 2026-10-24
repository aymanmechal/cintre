import { StatsContent } from '../components/StatsContent/StatsContent';
import { EmptyWardrobe } from '../../wardrobe/components/EmptyWardrobe/EmptyWardrobe';
import { useWardrobeStats } from '../hooks/useWardrobeStats';
import { PageHeader } from '../../../shared/ui/PageHeader/PageHeader';
import { formatPageTitle } from '../../../shared/utils/format';

export function StatsPage() {
  const stats = useWardrobeStats();

  return (
    <section>
      <title>{formatPageTitle('Mes chiffres')}</title>
      <PageHeader
        title="Mes chiffres"
        subtitle="Combien te coûte chaque pièce, à chaque fois que tu la portes."
      />
      {stats.ownedCount === 0 ? <EmptyWardrobe /> : <StatsContent stats={stats} />}
    </section>
  );
}
