import { useOutfits } from '../../../contexts/outfits/useOutfits';
import { useWornLog } from '../../../contexts/wornLog/useWornLog';
import type { CalendarState } from '../../../hooks/useCalendar';
import { isFutureDate, toIsoDate } from '../../../utils/wornDates';
import { findOutfit, selectEntriesOfDate } from '../../../utils/wornLog';
import { CalendarDayCell } from './CalendarDayCell';
import { WeekdayHeaders } from './WeekdayHeaders';
import styles from './CalendarGrid.module.css';

interface CalendarGridProps {
  calendar: CalendarState;
}

export function CalendarGrid({ calendar }: CalendarGridProps) {
  const { entries } = useWornLog();
  const { outfits } = useOutfits();
  const todayIsoDate = toIsoDate(calendar.today);

  function listOutfitNames(isoDate: string): string[] {
    return selectEntriesOfDate(entries, isoDate).map(
      (entry) => findOutfit(outfits, entry.outfitId)?.name ?? '?',
    );
  }

  return (
    <div className={styles.grid}>
      <WeekdayHeaders />
      <div className={styles.days}>
        {calendar.days.map((day) => (
          <CalendarDayCell
            key={day.isoDate}
            day={day}
            outfitNames={listOutfitNames(day.isoDate)}
            isSelected={day.isoDate === calendar.selectedDate}
            isToday={day.isoDate === todayIsoDate}
            isPlanned={isFutureDate(day.isoDate, calendar.today)}
            onSelect={calendar.selectDate}
          />
        ))}
      </div>
    </div>
  );
}
