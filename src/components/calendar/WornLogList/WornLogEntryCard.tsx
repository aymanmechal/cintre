import type { Outfit } from '../../../types/outfit';
import type { WardrobeItem } from '../../../types/wardrobe';
import type { WornEntry } from '../../../types/wornLog';
import { formatCalendarDate } from '../../../utils/wornDates';
import { DeleteWornEntryButton } from './DeleteWornEntryButton';
import { WornEntryPieces } from './WornEntryPieces';
import styles from './WornLogEntryCard.module.css';

const DELETED_OUTFIT_NAME = 'Tenue supprimée';

interface WornLogEntryCardProps {
  entry: WornEntry;
  outfit: Outfit | undefined;
  outfitItems: readonly WardrobeItem[];
  today: Date;
}

export function WornLogEntryCard({ entry, outfit, outfitItems, today }: WornLogEntryCardProps) {
  const dateLabel = formatCalendarDate(entry.date, today);

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div className={styles.heading}>
          <p className={styles.date}>{dateLabel}</p>
          <h3 className={styles.name}>{outfit?.name ?? DELETED_OUTFIT_NAME}</h3>
        </div>
        <DeleteWornEntryButton entryId={entry.id} dateLabel={dateLabel} />
      </header>
      <WornEntryPieces items={outfitItems} />
    </article>
  );
}
