import { ROUTES } from '../../../../shared/routes';
import { ButtonLink } from '../../../../shared/ui/Button/ButtonLink';
import { EmptyState } from '../../../../shared/ui/EmptyState/EmptyState';

export function PieceNotFound() {
  return (
    <EmptyState
      title="Pièce introuvable"
      message="Cette pièce n’existe pas ou ne fait pas partie du catalogue."
      action={<ButtonLink to={ROUTES.catalog}>Voir le catalogue</ButtonLink>}
    />
  );
}
