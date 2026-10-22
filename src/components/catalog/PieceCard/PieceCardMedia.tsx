import { Badge } from '../../ui/Badge/Badge';
import styles from './PieceCardMedia.module.css';

interface PieceCardMediaProps {
  imageUrl: string;
  categoryLabel: string;
}

export function PieceCardMedia({ imageUrl, categoryLabel }: PieceCardMediaProps) {
  return (
    <div className={styles.media}>
      <img src={imageUrl} alt="" loading="lazy" width={300} height={300} />
      <div className={styles.badgePosition}>
        <Badge label={categoryLabel} />
      </div>
    </div>
  );
}
