import { Link } from 'react-router';
import type { Piece } from '../../../../shared/pieces/types/piece';
import { buildEditPieceUrl } from '../../../../shared/routes';
import styles from './WardrobeItemTitle.module.css';

interface WardrobeItemTitleProps {
  piece: Piece;
  isLinked: boolean;
}

export function WardrobeItemTitle({ piece, isLinked }: WardrobeItemTitleProps) {
  return (
    <h3 className={styles.title}>
      {isLinked ? <Link to={buildEditPieceUrl(piece.id)}>{piece.title}</Link> : piece.title}
    </h3>
  );
}
