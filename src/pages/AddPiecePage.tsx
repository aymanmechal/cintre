import { AddPieceForm } from '../components/addPiece/AddPieceForm/AddPieceForm';
import { AddPieceHeader } from '../components/addPiece/AddPieceHeader/AddPieceHeader';
import { formatPageTitle } from '../utils/format';

export function AddPiecePage() {
  return (
    <section>
      <title>{formatPageTitle('Ajouter une pièce')}</title>
      <AddPieceHeader />
      <AddPieceForm />
    </section>
  );
}
