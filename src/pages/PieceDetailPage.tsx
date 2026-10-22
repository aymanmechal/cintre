import { useParams } from 'react-router';
import { BackToCatalogLink } from '../components/piece/PieceDetail/BackToCatalogLink';
import { PieceDetailLoader } from '../components/piece/PieceDetail/PieceDetailLoader';
import { PieceNotFound } from '../components/piece/PieceDetail/PieceNotFound';
import { parsePieceId } from '../utils/pieceId';

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
