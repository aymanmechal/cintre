import type { SuitcaseDay } from '../../types/suitcase';
import { formatFullDate } from '../../../calendar/utils/calendarMonth';
import { OutfitPieceThumbnail } from '../../../outfits/components/OutfitCard/OutfitPieceThumbnail';
import styles from './TripDays.module.css';

interface TripDaysProps {
  days: readonly SuitcaseDay[];
}

export function TripDays({ days }: TripDaysProps) {
  return (
    <details className={styles.days}>
      <summary className={styles.summary}>Voir les tenues jour par jour</summary>
      <ol className={styles.list}>
        {days.map((day, index) => (
          <li key={day.isoDate} className={styles.day}>
            <h3 className={styles.dayTitle}>
              Jour {index + 1} · {formatFullDate(day.isoDate)}
            </h3>
            <ul className={styles.pieces}>
              {day.items.map((item) => (
                <li key={item.piece.id}>
                  <OutfitPieceThumbnail item={item} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </details>
  );
}
