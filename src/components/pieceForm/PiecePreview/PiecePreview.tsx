import { PIECE_TYPE_LABELS } from '../../../constants/categories';
import type { PieceFormValues } from '../../../types/pieceForm';
import { buildPiecePreview } from '../../../utils/piecePreview';
import { Badge } from '../../ui/Badge/Badge';
import { WardrobeItemImage } from '../../wardrobe/ItemCard/WardrobeItemImage';
import styles from './PiecePreview.module.css';

interface PiecePreviewProps {
  values: PieceFormValues;
}

export function PiecePreview({ values }: PiecePreviewProps) {
  const preview = buildPiecePreview(values);

  return (
    <figure className={styles.preview} data-piece-type={preview.pieceType}>
      <div className={styles.media}>
        <WardrobeItemImage imageUrl={preview.imageUrl} />
        <div className={styles.badgePosition}>
          <Badge label={PIECE_TYPE_LABELS[preview.pieceType]} />
        </div>
      </div>
      <figcaption className={styles.body}>
        <div className={styles.text}>
          <p className={styles.brand}>{preview.brand}</p>
          <p className={styles.title} data-empty={!preview.hasTitle}>
            {preview.title}
          </p>
        </div>
        <p className={styles.price}>{preview.price}</p>
      </figcaption>
    </figure>
  );
}
