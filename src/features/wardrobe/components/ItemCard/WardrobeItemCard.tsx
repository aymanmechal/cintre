import { PIECE_TYPE_LABELS } from '../../../../shared/pieces/constants/categories';
import { OwnershipStatus } from '../../constants/wardrobe';
import type { WardrobeItem } from '../../types/wardrobe';
import { formatBrand, formatPrice } from '../../../../shared/utils/format';
import { Badge } from '../../../../shared/ui/Badge/Badge';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import type { WardrobeSelection } from '../../hooks/useWardrobeSelection';
import { WornStatus } from '../WornStatus/WornStatus';
import { PieceImage } from '../../../../shared/ui/PieceImage/PieceImage';
import { AvailabilityTag } from './AvailabilityTag';
import { ItemSelectBox } from './ItemSelectBox';
import { WardrobeItemColors } from './WardrobeItemColors';
import { WardrobeItemTags } from './WardrobeItemTags';
import { WardrobeItemTitle } from './WardrobeItemTitle';
import styles from './WardrobeItemCard.module.css';

interface WardrobeItemCardProps {
  item: WardrobeItem;
  selection: WardrobeSelection;
}

export function WardrobeItemCard({ item, selection }: WardrobeItemCardProps) {
  const { piece } = item;

  return (
    <article className={styles.card} data-piece-type={piece.pieceType}>
      <div className={styles.media}>
        <PieceImage imageUrl={piece.thumbnail} photoId={piece.photoId} />
        <div className={styles.badgePosition}>
          <Badge label={PIECE_TYPE_LABELS[piece.pieceType]} />
        </div>
        <div className={styles.favoritePosition}>
          <FavoriteButton piece={piece} />
        </div>
        {selection.isSelecting && (
          <ItemSelectBox
            pieceId={piece.id}
            pieceTitle={piece.title}
            isSelected={selection.isSelected(piece.id)}
            onToggle={() => selection.toggleItem(piece.id)}
          />
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.text}>
          <div className={styles.meta}>
            <p className={styles.brand}>{formatBrand(piece.brand)}</p>
            <WardrobeItemColors piece={piece} />
          </div>
          <WardrobeItemTitle piece={piece} isLinked={!selection.isSelecting} />
          <WardrobeItemTags piece={piece} />
        </div>
        <p className={styles.price}>{formatPrice(piece.price)}</p>
      </div>
      <AvailabilityTag item={item} />
      {item.status === OwnershipStatus.Owned && <WornStatus item={item} />}
    </article>
  );
}
