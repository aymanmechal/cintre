import { PIECE_TYPE_LABELS } from '../../../constants/categories';
import { OwnershipStatus } from '../../../constants/wardrobe';
import type { WardrobeItem } from '../../../types/wardrobe';
import { formatBrand, formatPrice } from '../../../utils/format';
import { Badge } from '../../ui/Badge/Badge';
import { ItemEditTools } from '../ItemEditTools/ItemEditTools';
import { WornStatus } from '../WornStatus/WornStatus';
import { WardrobeItemImage } from './WardrobeItemImage';
import { WardrobeItemTitle } from './WardrobeItemTitle';
import styles from './WardrobeItemCard.module.css';

interface WardrobeItemCardProps {
  item: WardrobeItem;
  isEditing: boolean;
}

export function WardrobeItemCard({ item, isEditing }: WardrobeItemCardProps) {
  const { piece } = item;

  return (
    <article className={styles.card} data-piece-type={piece.pieceType} data-editing={isEditing}>
      <div className={styles.media}>
        <WardrobeItemImage imageUrl={piece.thumbnail} />
        <div className={styles.badgePosition}>
          <Badge label={PIECE_TYPE_LABELS[piece.pieceType]} />
        </div>
        {isEditing && <ItemEditTools piece={piece} />}
      </div>
      <div className={styles.body}>
        <div className={styles.text}>
          <p className={styles.brand}>{formatBrand(piece.brand)}</p>
          <WardrobeItemTitle piece={piece} />
        </div>
        <p className={styles.price}>{formatPrice(piece.price)}</p>
      </div>
      {item.status === OwnershipStatus.Owned && <WornStatus item={item} isEditing={isEditing} />}
    </article>
  );
}
