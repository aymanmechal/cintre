import { ROUTES } from '../../../../shared/routes';
import { ButtonLink } from '../../../../shared/ui/Button/ButtonLink';
import { EmptyState } from '../../../../shared/ui/EmptyState/EmptyState';

export function OutfitIdeasNotFound() {
  return (
    <EmptyState
      title="Pièce introuvable"
      message="Elle a peut-être été supprimée."
      action={<ButtonLink to={ROUTES.outfits}>Voir mes tenues</ButtonLink>}
    />
  );
}
