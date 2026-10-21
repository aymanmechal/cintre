import { Link } from 'react-router';
import { findCategory } from '../../constants/categories';
import { UNKNOWN_BRAND } from '../../constants/catalog';
import { pieceUrl } from '../../routes';
import type { Piece } from '../../types/piece';
import { formatPrice } from '../../utils/format';
import styles from './PieceCard.module.css';

interface PieceCardProps {
  piece: Piece;
}

/**
 * Toute la carte est cliquable grâce au ::after du lien (voir CSS),
 * mais un seul lien est lu par le lecteur d'écran : le titre.
 */
export function PieceCard({ piece }: PieceCardProps) {
  const categoryLabel = findCategory(piece.category)?.label ?? piece.category;

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img src={piece.thumbnail} alt="" loading="lazy" width={300} height={300} />
        <span className={styles.badge}>{categoryLabel}</span>
      </div>
      <div className={styles.body}>
        <p className={styles.brand}>{piece.brand ?? UNKNOWN_BRAND}</p>
        <h2 className={styles.title}>
          <Link className={styles.link} to={pieceUrl(piece.id)}>
            {piece.title}
          </Link>
        </h2>
        <p className={styles.price}>{formatPrice(piece.price)}</p>
      </div>
    </article>
  );
}
