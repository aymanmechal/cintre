import { ROUTES } from '../../../../shared/routes';
import { ButtonLink } from '../../../../shared/ui/Button/ButtonLink';
import { EmptyState } from '../../../../shared/ui/EmptyState/EmptyState';

export function NoOutfitIdeas() {
  return (
    <EmptyState
      title="Plus d'idée pour l'instant"
      message="Ajoute des hauts, des bas ou des chaussures disponibles pour compléter ces pièces. Un seul haut, un seul bas et une seule paire de chaussures par tenue."
      action={<ButtonLink to={ROUTES.addPiece}>Ajouter une pièce</ButtonLink>}
    />
  );
}
