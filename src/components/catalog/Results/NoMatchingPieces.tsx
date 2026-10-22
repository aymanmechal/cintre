import { ButtonVariant } from '../../ui/Button/Button';
import { EmptyState } from '../../ui/EmptyState/EmptyState';
import { ResetFiltersButton } from '../Filters/ResetFiltersButton';

export function NoMatchingPieces() {
  return (
    <EmptyState
      title="Aucune pièce ne correspond"
      message="Essaie un autre mot-clé ou élargis les filtres."
      action={<ResetFiltersButton variant={ButtonVariant.Primary} />}
    />
  );
}
