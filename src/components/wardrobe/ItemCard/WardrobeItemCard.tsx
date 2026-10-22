import { PIECE_TYPE_LABELS } from '../../../constants/categories';
import { OwnershipStatus } from '../../../constants/wardrobe';
import type { WardrobeItem } from '../../../types/wardrobe';
import { formatBrand, formatPrice } from '../../../utils/format';
import { Badge } from '../../ui/Badge/Badge';
import { OwnershipPicker } from '../OwnershipPicker/OwnershipPicker';
import { OwnershipPickerSize } from '../OwnershipPicker/ownershipPickerSize';
import { WornStatus } from '../WornStatus/WornStatus';
import { EditPieceLink } from '../EditPieceLink/EditPieceLink';
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
    <article className={styles.card} data-piece-type={piece.pieceType}>
      <div className={styles.media}>
        <WardrobeItemImage imageUrl={piece.thumbnail} />
        <div className={styles.badgePosition}>
          <Badge label={PIECE_TYPE_LABELS[piece.pieceType]} />
        </div>
        <div className={styles.actionsPosition}>
          <EditPieceLink pieceId={piece.id} pieceTitle={piece.title} />
          <RemoveFromWardrobeButton pieceId={piece.id} pieceTitle={piece.title} />
        </div>
        <div className={styles.pickerPosition}>
          <OwnershipPicker piece={piece} size={OwnershipPickerSize.Compact} />
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.brand}>{formatBrand(piece.brand)}</p>
        <WardrobeItemTitle piece={piece} />
        <p className={styles.price}>{formatPrice(piece.price)}</p>
        {item.status === OwnershipStatus.Owned && (
          <>
            <WornStatus item={item} />
            <div className={styles.footer}>
              <LocationSelect item={item} />
            </div>
          </>
        )}
      </div>
    </article>
  );
}
