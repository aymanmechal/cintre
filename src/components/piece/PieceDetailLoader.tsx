import { usePieceDetail } from '../../hooks/usePieceDetail';
import { isNotFoundError } from '../../services/api/errors';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Loader } from '../ui/Loader';
import { PieceDetailView } from './PieceDetailView';
import { PieceNotFound } from './PieceNotFound';

interface PieceDetailLoaderProps {
  pieceId: number;
}

export function PieceDetailLoader({ pieceId }: PieceDetailLoaderProps) {
  const pieceDetail = usePieceDetail(pieceId);

  if (pieceDetail.status === 'loading') {
    return <Loader label="Chargement de la pièce…" />;
  }

  if (pieceDetail.status === 'error') {
    return isNotFoundError(pieceDetail.error) ? (
      <PieceNotFound />
    ) : (
      <ErrorMessage
        title="Pièce indisponible"
        message="Impossible de charger cette pièce. Vérifie ta connexion puis réessaie."
        onRetry={pieceDetail.retry}
      />
    );
  }

  return <PieceDetailView piece={pieceDetail.data} />;
}
