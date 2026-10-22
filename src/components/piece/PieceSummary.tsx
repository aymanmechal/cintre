import type { PieceDetail } from '../../types/piece';
import { getCategoryLabel } from '../../utils/categories';
import { formatBrand, formatPrice, formatRating } from '../../utils/format';
import styles from './PieceSummary.module.css';

interface PieceSummaryProps {
  piece: PieceDetail;
}

export function PieceSummary({ piece }: PieceSummaryProps) {
  return (
    <div className={styles.summary}>
      <span className={styles.badge}>{getCategoryLabel(piece.category)}</span>
      <p className={styles.brand}>{formatBrand(piece.brand)}</p>
      <h1 className={styles.title}>{piece.title}</h1>
      <div className={styles.priceRow}>
        <p className={styles.price}>{formatPrice(piece.price)}</p>
        <p className={styles.rating} aria-label={`Note : ${formatRating(piece.rating)}`}>
          ★ {formatRating(piece.rating)}
        </p>
      </div>
      <p className={styles.description}>{piece.description}</p>
    </div>
  );
}
