import { ButtonVariant } from '../../../../shared/ui/Button/Button';
import { EmptyState } from '../../../../shared/ui/EmptyState/EmptyState';
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
