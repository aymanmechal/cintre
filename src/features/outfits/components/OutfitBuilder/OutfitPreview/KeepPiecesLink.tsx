import { buildOutfitIdeasUrl } from '../../../../../shared/routes';
import { ButtonVariant } from '../../../../../shared/ui/Button/Button';
import { ButtonLink } from '../../../../../shared/ui/Button/ButtonLink';
import { formatPieceCount } from '../../../utils/outfits';

interface KeepPiecesLinkProps {
  pieceIds: readonly number[];
}

export function KeepPiecesLink({ pieceIds }: KeepPiecesLinkProps) {
  if (pieceIds.length === 0) return null;

  return (
    <ButtonLink to={buildOutfitIdeasUrl(...pieceIds)} variant={ButtonVariant.Ghost}>
      Je garde {formatPieceCount(pieceIds.length)} : voir des idées
    </ButtonLink>
  );
}
