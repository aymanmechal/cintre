import { PIECE_TYPE_LABELS } from '../../../constants/categories';
import type { WardrobeItem } from '../../../types/wardrobe';
import { formatBrand } from '../../../utils/format';
import { Badge } from '../../ui/Badge/Badge';
import { WardrobeItemControls } from './WardrobeItemControls';
import { WardrobeItemImage } from './WardrobeItemImage';
import { WardrobeItemTitle } from './WardrobeItemTitle';
import styles from './WardrobeItemCard.module.css';

interface WardrobeItemCardProps {
  item: WardrobeItem;
}

export function WardrobeItemCard({ item }: WardrobeItemCardProps) {
  const { piece } = item;

  return (
    <article className={styles.card}>
      <WardrobeItemImage imageUrl={piece.thumbnail} />
      <div className={styles.body}>
        <Badge label={PIECE_TYPE_LABELS[piece.pieceType]} />
        <p className={styles.brand}>{formatBrand(piece.brand)}</p>
        <WardrobeItemTitle piece={piece} />
        <WardrobeItemControls item={item} />
      </div>
    </article>
  );
}
