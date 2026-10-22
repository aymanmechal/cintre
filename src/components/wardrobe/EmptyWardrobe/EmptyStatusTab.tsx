import { OWNERSHIP_SECTION_TITLES, type OwnershipStatus } from '../../../constants/wardrobe';
import { ROUTES } from '../../../routes';
import { ButtonLink } from '../../ui/Button/ButtonLink';
import { EmptyState } from '../../ui/EmptyState/EmptyState';

interface EmptyStatusTabProps {
  status: OwnershipStatus;
}

export function EmptyStatusTab({ status }: EmptyStatusTabProps) {
  return (
    <EmptyState
      title={`Rien dans « ${OWNERSHIP_SECTION_TITLES[status]} » pour l’instant`}
      message="Ajoute des pièces depuis le catalogue ou crée la tienne."
      action={<ButtonLink to={ROUTES.catalog}>Parcourir le catalogue</ButtonLink>}
    />
  );
}
