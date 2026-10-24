import { ROUTES } from '../../../../shared/routes';
import { ButtonLink } from '../../../../shared/ui/Button/ButtonLink';
import { EmptyState } from '../../../../shared/ui/EmptyState/EmptyState';

export function EmptyWardrobe() {
  return (
    <EmptyState
      title="Ta garde-robe est vide"
      message="Ajoute les pièces que tu possèdes ou celles qui te font envie."
      action={<ButtonLink to={ROUTES.addPiece}>Ajouter une pièce</ButtonLink>}
    />
  );
}
