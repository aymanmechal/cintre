import { ROUTES } from '../../../../shared/routes';
import { ButtonLink } from '../../../../shared/ui/Button/ButtonLink';
import { EmptyState } from '../../../../shared/ui/EmptyState/EmptyState';

export function EditPieceNotFound() {
  return (
    <EmptyState
      title="Pièce introuvable"
      message="Cette pièce n’est pas (ou plus) dans ta garde-robe."
      action={<ButtonLink to={ROUTES.wardrobe}>Voir ma garde-robe</ButtonLink>}
    />
  );
}
