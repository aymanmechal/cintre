import type { CalendarState } from '../../hooks/useCalendar';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import styles from './MonthNavigation.module.css';

interface MonthNavigationProps {
  calendar: CalendarState;
}

export function MonthNavigation({ calendar }: MonthNavigationProps) {
  return (
    <div className={styles.navigation}>
      <h2 className={styles.title}>{calendar.monthTitle}</h2>
      <div className={styles.buttons}>
        <Button
          variant={ButtonVariant.Ghost}
          aria-label="Mois précédent"
          onClick={calendar.goToPreviousMonth}
        >
          ←
        </Button>
        <Button variant={ButtonVariant.Ghost} onClick={calendar.goToToday}>
          Aujourd'hui
        </Button>
        <Button
          variant={ButtonVariant.Ghost}
          aria-label="Mois suivant"
          onClick={calendar.goToNextMonth}
        >
          →
        </Button>
      </div>
    </div>
  );
}
