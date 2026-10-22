import { PIECE_TYPE_LABELS } from '../../../constants/categories';
import { OwnershipStatus } from '../../../constants/wardrobe';
import type { WardrobeItem } from '../../../types/wardrobe';
import { formatBrand, formatPrice } from '../../../utils/format';
import { Badge } from '../../ui/Badge/Badge';
import { OwnershipPicker } from '../OwnershipPicker/OwnershipPicker';
import { OwnershipPickerSize } from '../OwnershipPicker/ownershipPickerSize';
import { RemoveFromWardrobeButton } from '../RemoveFromWardrobeButton/RemoveFromWardrobeButton';
import { LocationSelect } from './LocationSelect';
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
      <div className={styles.media}>
        <WardrobeItemImage imageUrl={piece.thumbnail} />
        <div className={styles.badgePosition}>
          <Badge label={PIECE_TYPE_LABELS[piece.pieceType]} />
        </div>
        <div className={styles.pickerPosition}>
          <OwnershipPicker piece={piece} size={OwnershipPickerSize.Compact} />
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.brand}>{formatBrand(piece.brand)}</p>
        <WardrobeItemTitle piece={piece} />
        <p className={styles.price}>{formatPrice(piece.price)}</p>
        <div className={styles.footer}>
          {item.status === OwnershipStatus.Owned && <LocationSelect item={item} />}
          <RemoveFromWardrobeButton pieceId={piece.id} pieceTitle={piece.title} />
        </div>
      </div>
    </article>
  );
}
