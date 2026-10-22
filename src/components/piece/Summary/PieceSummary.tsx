import type { PieceDetail } from '../../../types/piece';
import { getCategoryLabel } from '../../../utils/categories';
import { formatBrand } from '../../../utils/format';
import { Badge } from '../../ui/Badge/Badge';
import { PiecePrice } from './PiecePrice';
import { PieceRating } from './PieceRating';
import styles from './PieceSummary.module.css';

interface PieceSummaryProps {
  piece: PieceDetail;
}

export function PieceSummary({ piece }: PieceSummaryProps) {
  return (
    <div className={styles.summary}>
      <Badge label={getCategoryLabel(piece.category)} />
      <p className={styles.brand}>{formatBrand(piece.brand)}</p>
      <h1 className={styles.title}>{piece.title}</h1>
      <div className={styles.priceRow}>
        <PiecePrice price={piece.price} />
        <PieceRating rating={piece.rating} />
      </div>
      <p className={styles.description}>{piece.description}</p>
    </div>
  );
}
