import { OWNERSHIP_SECTION_TITLES, type OwnershipStatus } from '../../constants/wardrobe';
import { ROUTES } from '../../../../shared/routes';
import { ButtonLink } from '../../../../shared/ui/Button/ButtonLink';
import { EmptyState } from '../../../../shared/ui/EmptyState/EmptyState';

interface EmptyStatusTabProps {
  status: OwnershipStatus;
}

export function EmptyStatusTab({ status }: EmptyStatusTabProps) {
  return (
    <EmptyState
      title={`Rien dans « ${OWNERSHIP_SECTION_TITLES[status]} » pour l’instant`}
      message="Ajoute ta première pièce ici."
      action={<ButtonLink to={ROUTES.addPiece}>Ajouter une pièce</ButtonLink>}
    />
  );
}
