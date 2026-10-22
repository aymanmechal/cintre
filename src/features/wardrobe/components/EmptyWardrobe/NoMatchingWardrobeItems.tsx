import { Button } from '../../../../shared/ui/Button/Button';
import { EmptyState } from '../../../../shared/ui/EmptyState/EmptyState';

interface NoMatchingWardrobeItemsProps {
  onShowAllTypes: () => void;
}

export function NoMatchingWardrobeItems({ onShowAllTypes }: NoMatchingWardrobeItemsProps) {
  return (
    <EmptyState
      title="Aucune pièce de ce type"
      message="Change de type pour retrouver tes autres pièces."
      action={<Button onClick={onShowAllTypes}>Afficher tous les types</Button>}
    />
  );
}
