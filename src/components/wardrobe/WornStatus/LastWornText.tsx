import { formatLastWorn } from '../../../utils/wornDates';
import styles from './LastWornText.module.css';

interface LastWornTextProps {
  lastWornOn: string | null;
  isForgotten: boolean;
  today: Date;
}

export function LastWornText({ lastWornOn, isForgotten, today }: LastWornTextProps) {
  return (
    <p className={styles.text} data-forgotten={isForgotten}>
      {formatLastWorn(lastWornOn, today)}
      {isForgotten && <span className={styles.flag}>À ressortir</span>}
    </p>
  );
}
