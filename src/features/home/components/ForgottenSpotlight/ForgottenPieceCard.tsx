import { Link } from 'react-router';
import type { WardrobeItem } from '../../../wardrobe/types/wardrobe';
import { formatLastWorn } from '../../../wardrobe/utils/wornDates';
import { PieceImage } from '../../../../shared/ui/PieceImage/PieceImage';
import styles from './ForgottenPieceCard.module.css';

interface ForgottenPieceCardProps {
  item: WardrobeItem;
  today: Date;
  to: string;
}

export function ForgottenPieceCard({ item, today, to }: ForgottenPieceCardProps) {
  const { piece } = item;

  return (
    <Link className={styles.card} to={to} data-piece-type={piece.pieceType}>
      <span className={styles.media}>
        <PieceImage imageUrl={piece.thumbnail} />
      </span>
      <span className={styles.title}>{piece.title}</span>
      <span className={styles.worn}>{formatLastWorn(item.lastWornOn, today)}</span>
    </Link>
  );
}
