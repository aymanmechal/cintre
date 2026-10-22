import { ROUTES } from '../../../routes';
import { ButtonLink } from '../../ui/Button/ButtonLink';
import { EmptyState } from '../../ui/EmptyState/EmptyState';

export function PieceNotFound() {
  return (
    <EmptyState
      title="Pièce introuvable"
      message="Cette pièce n’existe pas ou ne fait pas partie du catalogue."
      action={<ButtonLink to={ROUTES.catalog}>Voir le catalogue</ButtonLink>}
    />
  );
}
