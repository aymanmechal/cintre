import { ROUTES } from '../../routes';
import { ButtonLink } from '../ui/ButtonLink';

export function AddPieceLink() {
  return (
    <ButtonLink variant="action" to={ROUTES.addPiece}>
      + Ajouter une pièce
    </ButtonLink>
  );
}
