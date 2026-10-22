import { AddPieceHeader } from '../components/AddPieceHeader/AddPieceHeader';
import { PieceFormWorkspace } from '../components/PieceFormWorkspace/PieceFormWorkspace';
import { ADD_PIECE_FORM_LABELS, INITIAL_PIECE_FORM_VALUES } from '../constants/pieceForm';
import { useAddPiece } from '../hooks/useAddPiece';
import { formatPageTitle } from '../../../shared/utils/format';

export function AddPiecePage() {
  const savePiece = useAddPiece();

  return (
    <section>
      <title>{formatPageTitle('Ajouter une pièce')}</title>
      <AddPieceHeader />
      <PieceFormWorkspace
        initialValues={INITIAL_PIECE_FORM_VALUES}
        labels={ADD_PIECE_FORM_LABELS}
        onSave={savePiece}
        shouldResetOnSuccess
      />
    </section>
  );
}
