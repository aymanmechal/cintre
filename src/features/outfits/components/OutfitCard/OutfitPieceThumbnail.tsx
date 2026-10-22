import type { WardrobeItem } from '../../../wardrobe/types/wardrobe';
import { PieceImage } from '../../../../shared/ui/PieceImage/PieceImage';
import styles from './OutfitPieceThumbnail.module.css';

interface OutfitPieceThumbnailProps {
  item: WardrobeItem;
}

export function OutfitPieceThumbnail({ item }: OutfitPieceThumbnailProps) {
  const { piece } = item;

  return (
    <figure
      className={styles.thumbnail}
      data-piece-type={piece.pieceType}
      data-status={item.status}
    >
      <span className={styles.media}>
        <PieceImage imageUrl={piece.thumbnail} />
      </span>
      <figcaption className={styles.caption}>{piece.title}</figcaption>
    </figure>
  );
}
