import { SAVE_STATUS_MESSAGES, SaveStatus } from '../../../shared/save/constants/save';
import { useSaveStatus } from '../../../shared/save/hooks/useSaveStatus';
import styles from './Footer.module.css';

export function SaveIndicator() {
  const status = useSaveStatus();

  return (
    <p
      className={status === SaveStatus.Failed ? styles.saveFailed : styles.saveOk}
      aria-live="polite"
    >
      {SAVE_STATUS_MESSAGES[status]}
    </p>
  );
}
