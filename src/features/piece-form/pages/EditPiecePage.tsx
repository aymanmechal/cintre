import { useParams } from 'react-router';
import { EditPieceContent } from '../components/EditPiece/EditPieceContent';
import { EditPieceNotFound } from '../components/EditPieceNotFound/EditPieceNotFound';
import { useWardrobeItem } from '../../wardrobe/hooks/useWardrobeItem';
import { formatPageTitle } from '../../../shared/utils/format';
import { parseWardrobePieceId } from '../../../shared/pieces/utils/pieceId';

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
