import { useParams } from 'react-router';
import { BackToCatalogLink } from '../components/PieceDetail/BackToCatalogLink';
import { PieceDetailLoader } from '../components/PieceDetail/PieceDetailLoader';
import { PieceNotFound } from '../components/PieceDetail/PieceNotFound';
import { parsePieceId } from '../../../shared/pieces/utils/pieceId';

export function PieceDetailPage() {
  const { id } = useParams();
  const pieceId = parsePieceId(id);

  return (
    <section>
      <BackToCatalogLink />
      {pieceId === null ? <PieceNotFound /> : <PieceDetailLoader pieceId={pieceId} />}
    </section>
  );
}
