import { buildEditPieceUrl } from '../../../../shared/routes';
import { IconLink } from '../../../../shared/ui/IconButton/IconLink';

const EDIT_ICON = '✎';

interface EditPieceLinkProps {
  pieceId: number;
  pieceTitle: string;
}

export function EditPieceLink({ pieceId, pieceTitle }: EditPieceLinkProps) {
  return (
    <IconLink icon={EDIT_ICON} label={`Modifier ${pieceTitle}`} to={buildEditPieceUrl(pieceId)} />
  );
}
