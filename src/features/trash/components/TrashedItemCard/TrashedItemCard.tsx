import type { TrashedItem } from '../../../wardrobe/types/wardrobe';
import { countDaysBeforePurge, formatDaysBeforePurge } from '../../../wardrobe/utils/trash';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { PieceImage } from '../../../../shared/ui/PieceImage/PieceImage';
import styles from './TrashedItemCard.module.css';

interface TrashedItemCardProps {
  trashedItem: TrashedItem;
  today: Date;
  onRestore: (pieceId: number) => void;
}

export function TrashedItemCard({ trashedItem, today, onRestore }: TrashedItemCardProps) {
  const { piece } = trashedItem.item;

  return (
    <article className={styles.card} data-piece-type={piece.pieceType}>
      <div className={styles.media}>
        <PieceImage imageUrl={piece.thumbnail} photoId={piece.photoId} />
      </div>
      <h2 className={styles.title}>{piece.title}</h2>
      <p className={styles.delay}>
        {formatDaysBeforePurge(countDaysBeforePurge(trashedItem, today))}
      </p>
      <Button variant={ButtonVariant.Primary} onClick={() => onRestore(piece.id)}>
        Restaurer
      </Button>
    </article>
  );
}
