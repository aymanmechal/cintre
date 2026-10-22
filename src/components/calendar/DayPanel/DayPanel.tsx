import { useWornLog } from '../../../contexts/wornLog/useWornLog';
import type { CalendarState } from '../../../hooks/useCalendar';
import { formatFullDate } from '../../../utils/calendarMonth';
import { selectEntriesOfDate } from '../../../utils/wornLog';
import { LogOutfitForm } from '../LogOutfitForm/LogOutfitForm';
import { WornLogList } from '../WornLogList/WornLogList';
import styles from './DayPanel.module.css';

interface DayPanelProps {
  calendar: CalendarState;
}

export function DayPanel({ calendar }: DayPanelProps) {
  const { entries } = useWornLog();
  const { selectedDate, today } = calendar;

  return (
    <aside className={styles.panel} aria-labelledby="day-panel-title">
      <h3 id="day-panel-title" className={styles.title}>
        {formatFullDate(selectedDate)}
      </h3>
      <WornLogList entries={selectEntriesOfDate(entries, selectedDate)} today={today} />
      <LogOutfitForm key={selectedDate} date={selectedDate} />
    </aside>
  );
}
