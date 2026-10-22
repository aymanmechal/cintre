import { MAX_OUTFITS_SHOWN_PER_DAY } from '../../constants/calendar';
import type { CalendarDay } from '../../types/calendar';
import styles from './CalendarDayCell.module.css';

interface CalendarDayCellProps {
  day: CalendarDay;
  outfitNames: readonly string[];
  isSelected: boolean;
  isToday: boolean;
  isPlanned: boolean;
  onSelect: (isoDate: string) => void;
}

export function CalendarDayCell({
  day,
  outfitNames,
  isSelected,
  isToday,
  isPlanned,
  onSelect,
}: CalendarDayCellProps) {
  const hiddenCount = outfitNames.length - MAX_OUTFITS_SHOWN_PER_DAY;

  return (
    <button
      type="button"
      className={styles.cell}
      data-current-month={day.isCurrentMonth}
      data-today={isToday}
      data-planned={isPlanned}
      aria-pressed={isSelected}
      onClick={() => onSelect(day.isoDate)}
    >
      <span className={styles.number}>{day.dayNumber}</span>
      <span className={styles.outfits}>
        {outfitNames.slice(0, MAX_OUTFITS_SHOWN_PER_DAY).map((name, index) => (
          <span key={`${name}-${index}`} className={styles.outfit}>
            {name}
          </span>
        ))}
        {hiddenCount > 0 && <span className={styles.more}>+{hiddenCount}</span>}
      </span>
    </button>
  );
}
