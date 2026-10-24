import { AddPieceHeader } from '../components/AddPieceHeader/AddPieceHeader';
import { PieceFormWorkspace } from '../components/PieceFormWorkspace/PieceFormWorkspace';
import { ADD_PIECE_FORM_LABELS } from '../constants/pieceForm';
import { useAddPiece } from '../hooks/useAddPiece';
import { useAddPieceInitialValues } from '../hooks/useAddPieceInitialValues';
import { formatPageTitle } from '../../../shared/utils/format';

export function AddPiecePage() {
  const savePiece = useAddPiece();
  const { initialValues, isShared, formKey } = useAddPieceInitialValues();

  return (
    <section>
      <title>{formatPageTitle('Ajouter une pièce')}</title>
      <AddPieceHeader isShared={isShared} />
      <PieceFormWorkspace
        key={formKey}
        initialValues={initialValues}
        labels={ADD_PIECE_FORM_LABELS}
        onSave={savePiece}
        shouldResetOnSuccess
      />
    </section>
  );
}
