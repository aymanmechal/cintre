import { ROUTES } from '../../../routes';
import { ButtonLink } from '../../ui/Button/ButtonLink';
import { EmptyState } from '../../ui/EmptyState/EmptyState';

export function EditPieceNotFound() {
  return (
    <EmptyState
      title="Pièce introuvable"
      message="Cette pièce n’est pas (ou plus) dans ta garde-robe."
      action={<ButtonLink to={ROUTES.wardrobe}>Voir ma garde-robe</ButtonLink>}
    />
  );
}
