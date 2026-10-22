import { EDIT_PIECE_FORM_LABELS } from '../../constants/pieceForm';
import { useEditPiece } from '../../hooks/useEditPiece';
import type { WardrobeItem } from '../../../wardrobe/types/wardrobe';
import { toPieceFormValues } from '../../utils/pieceFormValues';
import { PageHeader } from '../../../../shared/ui/PageHeader/PageHeader';
import { DeletePieceSection } from '../DeletePiece/DeletePieceSection';
import { PieceFormWorkspace } from '../PieceFormWorkspace/PieceFormWorkspace';

interface EditPieceContentProps {
  item: WardrobeItem;
}

export function EditPieceContent({ item }: EditPieceContentProps) {
  const savePiece = useEditPiece(item);

  return (
    <>
      <PageHeader title="Modifier la pièce" subtitle={item.piece.title} />
      <PieceFormWorkspace
        initialValues={toPieceFormValues(item)}
        labels={EDIT_PIECE_FORM_LABELS}
        onSave={savePiece}
        shouldResetOnSuccess={false}
      />
      <DeletePieceSection piece={item.piece} />
    </>
  );
}
