import { useParams } from 'react-router';
import { EditPieceContent } from '../components/pieceForm/EditPiece/EditPieceContent';
import { EditPieceNotFound } from '../components/pieceForm/EditPieceNotFound/EditPieceNotFound';
import { useWardrobeItem } from '../hooks/useWardrobeItem';
import { formatPageTitle } from '../utils/format';
import { parseWardrobePieceId } from '../utils/pieceId';

export function EditPiecePage() {
  const { id } = useParams();
  const item = useWardrobeItem(parseWardrobePieceId(id));

  return (
    <section>
      <title>{formatPageTitle('Modifier une pièce')}</title>
      {item ? <EditPieceContent item={item} /> : <EditPieceNotFound />}
    </section>
  );
}
