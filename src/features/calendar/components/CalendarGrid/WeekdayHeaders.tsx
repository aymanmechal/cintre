import { WEEKDAY_LABELS } from '../../constants/calendar';
import styles from './WeekdayHeaders.module.css';

export function WeekdayHeaders() {
  return (
    <ul className={styles.headers} aria-hidden="true">
      {WEEKDAY_LABELS.map((label) => (
        <li key={label}>{label}</li>
      ))}
    </ul>
  );
}
