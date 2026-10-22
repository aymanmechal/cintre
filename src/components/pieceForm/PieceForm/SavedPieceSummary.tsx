import { Link } from 'react-router';
import { ROUTES } from '../../../routes';
import type { SavedPiece } from '../../../types/pieceForm';
import { formatApiProductId, formatBrand, formatPrice } from '../../../utils/format';
import styles from './SavedPieceSummary.module.css';

interface SavedPieceSummaryProps {
  title: string;
  savedPiece: SavedPiece;
}

export function SavedPieceSummary({ title, savedPiece }: SavedPieceSummaryProps) {
  const { piece, apiProductId } = savedPiece;

  return (
    <span className={styles.summary}>
      <strong>{title}</strong>
      <span>
        {piece.title} · {formatBrand(piece.brand)} · {formatPrice(piece.price)}
      </span>
      <span className={styles.apiId}>{formatApiProductId(apiProductId)}</span>
      <Link to={ROUTES.wardrobe}>Voir ma garde-robe</Link>
    </span>
  );
}
