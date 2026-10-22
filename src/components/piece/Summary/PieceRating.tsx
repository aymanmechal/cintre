import { formatRating } from '../../../utils/format';
import styles from './PieceRating.module.css';

interface PieceRatingProps {
  rating: number;
}

export function PieceRating({ rating }: PieceRatingProps) {
  const ratingText = formatRating(rating);

  return (
    <p className={styles.rating} aria-label={`Note : ${ratingText}`}>
      ★ {ratingText}
    </p>
  );
}
