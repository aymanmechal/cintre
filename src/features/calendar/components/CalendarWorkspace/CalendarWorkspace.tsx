import { useOutfits } from '../../../outfits/context/useOutfits';
import { useCalendar } from '../../hooks/useCalendar';
import { CalendarGrid } from '../CalendarGrid/CalendarGrid';
import { DayPanel } from '../DayPanel/DayPanel';
import { MonthNavigation } from '../MonthNavigation/MonthNavigation';
import { NoOutfitsToLog } from '../NoOutfitsToLog/NoOutfitsToLog';
import styles from './CalendarWorkspace.module.css';

export function CalendarWorkspace() {
  const { outfits } = useOutfits();
  const calendar = useCalendar();

  if (outfits.length === 0) return <NoOutfitsToLog />;

  return (
    <div className={styles.workspace}>
      <div className={styles.month}>
        <MonthNavigation calendar={calendar} />
        <CalendarGrid calendar={calendar} />
      </div>
      <DayPanel calendar={calendar} />
    </div>
  );
}
