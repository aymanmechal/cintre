import { formatRating } from '../../../utils/format';
import styles from './PieceRating.module.css';

interface PieceRatingProps {
  rating: number;
}

export function PieceRating({ rating }: PieceRatingProps) {
  return (
    <p className={styles.rating}>
      <span aria-hidden="true">★ </span>
      <span className="visually-hidden">Note : </span>
      {formatRating(rating)}
    </p>
  );
}
