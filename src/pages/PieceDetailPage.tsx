import { useParams } from 'react-router';
import { BackToCatalogLink } from '../components/piece/BackToCatalogLink';
import { PieceDetailLoader } from '../components/piece/PieceDetailLoader';
import { PieceNotFound } from '../components/piece/PieceNotFound';
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
