import { ROUTES } from '../../../../shared/routes';
import { ButtonLink } from '../../../../shared/ui/Button/ButtonLink';
import { EmptyState } from '../../../../shared/ui/EmptyState/EmptyState';

export function NoOutfitsToLog() {
  return (
    <EmptyState
      title="Aucune tenue à enregistrer"
      message="Compose d'abord une tenue, tu pourras ensuite noter quand tu l'as portée."
      action={<ButtonLink to={ROUTES.outfits}>Composer une tenue</ButtonLink>}
    />
  );
}
