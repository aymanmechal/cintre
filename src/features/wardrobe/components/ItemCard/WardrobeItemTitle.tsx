import { Link } from 'react-router';
import type { Piece } from '../../../../shared/pieces/types/piece';
import { buildPieceUrl } from '../../../../shared/routes';
import { isCatalogPiece } from '../../../../shared/pieces/utils/pieceOrigin';
import styles from './WardrobeItemTitle.module.css';

interface WardrobeItemTitleProps {
  piece: Piece;
}

export function WardrobeItemTitle({ piece }: WardrobeItemTitleProps) {
  return (
    <h3 className={styles.title}>
      {isCatalogPiece(piece.id) ? (
        <Link to={buildPieceUrl(piece.id)}>{piece.title}</Link>
      ) : (
        piece.title
      )}
    </h3>
  );
}
