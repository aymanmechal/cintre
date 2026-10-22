import { useCatalogFilters } from '../../../contexts/catalogFilters/useCatalogFilters';
import { Button, ButtonVariant } from '../../ui/Button/Button';

interface ResetFiltersButtonProps {
  variant: ButtonVariant;
}

export function ResetFiltersButton({ variant }: ResetFiltersButtonProps) {
  const { resetFilters } = useCatalogFilters();

  return (
    <Button variant={variant} onClick={resetFilters}>
      <span aria-hidden="true">✕</span>
      Effacer les filtres
    </Button>
  );
}
