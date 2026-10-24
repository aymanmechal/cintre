import { TripContent } from '../components/TripContent/TripContent';
import { TripFormCard } from '../components/TripFormCard/TripFormCard';
import { useSuitcase } from '../hooks/useSuitcase';
import { EmptyWardrobe } from '../../wardrobe/components/EmptyWardrobe/EmptyWardrobe';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { PageHeader } from '../../../shared/ui/PageHeader/PageHeader';
import { formatPageTitle } from '../../../shared/utils/format';

export function SuitcasePage() {
  const { items } = useWardrobe();
  const { suitcase, error, isSearching, prepareTrip, togglePacked, resetSuitcase } = useSuitcase();

  return (
    <section>
      <title>{formatPageTitle('Ma valise')}</title>
      <PageHeader
        title="Ma valise"
        subtitle="Le minimum à emporter, choisi selon la météo de ta destination."
      />
      {items.length === 0 && <EmptyWardrobe />}
      {items.length > 0 && suitcase === null && (
        <TripFormCard error={error} isSearching={isSearching} onSubmit={prepareTrip} />
      )}
      {items.length > 0 && suitcase !== null && (
        <TripContent suitcase={suitcase} onToggle={togglePacked} onReset={resetSuitcase} />
      )}
    </section>
  );
}
