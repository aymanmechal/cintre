import { Button } from '../../../../shared/ui/Button/Button';
import { EmptyState } from '../../../../shared/ui/EmptyState/EmptyState';

interface NoMatchingWardrobeItemsProps {
  onResetFilters: () => void;
}

export function NoMatchingWardrobeItems({ onResetFilters }: NoMatchingWardrobeItemsProps) {
  return (
    <EmptyState
      title="Aucune pièce trouvée"
      message="Aucune pièce ne correspond à ta recherche ou à tes filtres."
      action={<Button onClick={onResetFilters}>Effacer les filtres</Button>}
    />
  );
}
