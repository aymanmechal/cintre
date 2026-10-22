import { WardrobeSortOrder } from '../../constants/wardrobeView';
import { formatForgottenMessage } from '../../utils/wornDates';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import styles from './ForgottenReminder.module.css';

interface ForgottenReminderProps {
  forgottenCount: number;
  onShowForgotten: (sortOrder: WardrobeSortOrder) => void;
}

export function ForgottenReminder({ forgottenCount, onShowForgotten }: ForgottenReminderProps) {
  return (
    <aside className={styles.reminder}>
      <p className={styles.message}>{formatForgottenMessage(forgottenCount)}</p>
      <Button
        variant={ButtonVariant.Ghost}
        onClick={() => onShowForgotten(WardrobeSortOrder.LeastRecentlyWorn)}
      >
        Voir les plus oubliées
      </Button>
    </aside>
  );
}
