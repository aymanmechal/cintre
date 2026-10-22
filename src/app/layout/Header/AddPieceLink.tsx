import { ROUTES } from '../../../shared/routes';
import { ButtonLink } from '../../../shared/ui/Button/ButtonLink';
import { ButtonVariant } from '../../../shared/ui/Button/Button';

export function AddPieceLink() {
  return (
    <ButtonLink variant={ButtonVariant.Action} to={ROUTES.addPiece}>
      + Ajouter une pièce
    </ButtonLink>
  );
}
