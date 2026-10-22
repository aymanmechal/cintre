import { AddPieceHeader } from '../components/addPiece/AddPieceHeader/AddPieceHeader';
import { PieceForm } from '../components/pieceForm/PieceForm/PieceForm';
import { ADD_PIECE_FORM_LABELS, INITIAL_PIECE_FORM_VALUES } from '../constants/pieceForm';
import { useAddPiece } from '../hooks/useAddPiece';
import { formatPageTitle } from '../utils/format';

export function AddPiecePage() {
  const savePiece = useAddPiece();

  return (
    <section>
      <title>{formatPageTitle('Ajouter une pièce')}</title>
      <AddPieceHeader />
      <PieceForm
        initialValues={INITIAL_PIECE_FORM_VALUES}
        labels={ADD_PIECE_FORM_LABELS}
        onSave={savePiece}
        shouldResetOnSuccess
      />
    </section>
  );
}
