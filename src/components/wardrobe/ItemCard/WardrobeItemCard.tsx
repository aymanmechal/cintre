import { Link } from 'react-router';
import { PIECE_TYPE_LABELS } from '../../../constants/categories';
import { buildPieceUrl } from '../../../routes';
import type { WardrobeItem } from '../../../types/wardrobe';
import { formatBrand } from '../../../utils/format';
import { Badge } from '../../ui/Badge/Badge';
import { WardrobeItemControls } from './WardrobeItemControls';
import styles from './WardrobeItemCard.module.css';

interface WardrobeItemCardProps {
  item: WardrobeItem;
}

export function WardrobeItemCard({ item }: WardrobeItemCardProps) {
  const { piece } = item;

  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={piece.thumbnail}
        alt=""
        loading="lazy"
        width={120}
        height={120}
      />
      <div className={styles.body}>
        <Badge label={PIECE_TYPE_LABELS[piece.pieceType]} />
        <p className={styles.brand}>{formatBrand(piece.brand)}</p>
        <h3 className={styles.title}>
          <Link to={buildPieceUrl(piece.id)}>{piece.title}</Link>
        </h3>
        <WardrobeItemControls item={item} />
      </div>
    </article>
  );
}
