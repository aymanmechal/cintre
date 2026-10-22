import type { ReactNode } from 'react';
import { Badge } from '../../../../shared/ui/Badge/Badge';
import styles from './PieceCardMedia.module.css';

interface PieceCardMediaProps {
  imageUrl: string;
  categoryLabel: string;
  action: ReactNode;
}

export function PieceCardMedia({ imageUrl, categoryLabel, action }: PieceCardMediaProps) {
  return (
    <div className={styles.media}>
      <img src={imageUrl} alt="" loading="lazy" width={300} height={300} />
      <div className={styles.badgePosition}>
        <Badge label={categoryLabel} />
      </div>
      <div className={styles.actionPosition}>{action}</div>
    </div>
  );
}
