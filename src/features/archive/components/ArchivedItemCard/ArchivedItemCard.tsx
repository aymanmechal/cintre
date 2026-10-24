import type { ArchivedItem } from '../../../wardrobe/types/wardrobe';
import { ARCHIVE_REASON_LABELS } from '../../../wardrobe/constants/wardrobe';
import { formatCalendarDate } from '../../../wardrobe/utils/wornDates';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { PieceImage } from '../../../../shared/ui/PieceImage/PieceImage';
import styles from './ArchivedItemCard.module.css';

interface ArchivedItemCardProps {
  archivedItem: ArchivedItem;
  today: Date;
  onUnarchive: (pieceId: number) => void;
}

export function ArchivedItemCard({ archivedItem, today, onUnarchive }: ArchivedItemCardProps) {
  const { piece } = archivedItem.item;

  return (
    <article className={styles.card} data-piece-type={piece.pieceType}>
      <div className={styles.media}>
        <PieceImage imageUrl={piece.thumbnail} photoId={piece.photoId} />
      </div>
      <h2 className={styles.title}>{piece.title}</h2>
      <p className={styles.reason}>
        {ARCHIVE_REASON_LABELS[archivedItem.reason]} ·{' '}
        {formatCalendarDate(archivedItem.archivedOn, today)}
      </p>
      <Button variant={ButtonVariant.Primary} onClick={() => onUnarchive(piece.id)}>
        Remettre dans l’armoire
      </Button>
    </article>
  );
}
