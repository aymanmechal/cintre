import { useCatalogFilters } from '../../../contexts/catalogFilters/useCatalogFilters';
import { Button } from '../../ui/Button/Button';
import type { ButtonVariant } from '../../ui/Button/buttonVariant';

interface ResetFiltersButtonProps {
  variant: ButtonVariant;
}

export function ResetFiltersButton({ variant }: ResetFiltersButtonProps) {
  const { resetFilters } = useCatalogFilters();

  return (
    <Button variant={variant} onClick={resetFilters}>
      Effacer les filtres
    </Button>
  );
}
