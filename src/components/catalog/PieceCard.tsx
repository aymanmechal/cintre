import { Link } from 'react-router';
import { buildPieceUrl } from '../../routes';
import type { Piece } from '../../types/piece';
import { getCategoryLabel } from '../../utils/categories';
import { formatBrand, formatPrice } from '../../utils/format';
import styles from './PieceCard.module.css';

interface PieceCardProps {
  piece: Piece;
}

export function PieceCard({ piece }: PieceCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img src={piece.thumbnail} alt="" loading="lazy" width={300} height={300} />
        <span className={styles.badge}>{getCategoryLabel(piece.category)}</span>
      </div>
      <div className={styles.body}>
        <p className={styles.brand}>{formatBrand(piece.brand)}</p>
        <h2 className={styles.title}>
          <Link className={styles.stretchedLink} to={buildPieceUrl(piece.id)}>
            {piece.title}
          </Link>
        </h2>
        <p className={styles.price}>{formatPrice(piece.price)}</p>
      </div>
    </article>
  );
}
