import { EmptyState } from '../ui/EmptyState';
import { ResetFiltersButton } from './ResetFiltersButton';

export function NoMatchingPieces() {
  return (
    <EmptyState
      title="Aucune pièce ne correspond"
      message="Essaie un autre mot-clé ou élargis les filtres."
      action={<ResetFiltersButton variant="primary" />}
    />
  );
}
