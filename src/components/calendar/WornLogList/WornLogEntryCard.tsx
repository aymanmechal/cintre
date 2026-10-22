import type { Outfit } from '../../../types/outfit';
import type { WardrobeItem } from '../../../types/wardrobe';
import type { WornEntry } from '../../../types/wornLog';
import { formatFullDate } from '../../../utils/calendarMonth';
import { isFutureDate } from '../../../utils/wornDates';
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
  const isPlanned = isFutureDate(entry.date, today);

  return (
    <article className={styles.card} data-planned={isPlanned}>
      <header className={styles.header}>
        <div>
          <p className={styles.status}>{isPlanned ? 'Prévue' : 'Portée'}</p>
          <h4 className={styles.name}>{outfit?.name ?? DELETED_OUTFIT_NAME}</h4>
        </div>
        <DeleteWornEntryButton entryId={entry.id} dateLabel={formatFullDate(entry.date)} />
      </header>
      <WornEntryPieces items={outfitItems} />
    </article>
  );
}
