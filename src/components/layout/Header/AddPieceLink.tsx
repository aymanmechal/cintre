import { ROUTES } from '../../../routes';
import { ButtonLink } from '../../ui/Button/ButtonLink';
import { ButtonVariant } from '../../ui/Button/Button';

export function AddPieceLink() {
  return (
    <ButtonLink variant={ButtonVariant.Action} to={ROUTES.addPiece}>
      + Ajouter une pièce
    </ButtonLink>
  );
}
