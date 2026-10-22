import { WardrobeSortOrder } from '../../../constants/wardrobeView';
import { formatPieceCount } from '../../../utils/format';
import { Button, ButtonVariant } from '../../ui/Button/Button';
import styles from './ForgottenReminder.module.css';

interface ForgottenReminderProps {
  forgottenCount: number;
  onShowForgotten: (sortOrder: WardrobeSortOrder) => void;
}

export function ForgottenReminder({ forgottenCount, onShowForgotten }: ForgottenReminderProps) {
  return (
    <aside className={styles.reminder}>
      <p className={styles.message}>
        {formatPieceCount(forgottenCount)} dorme{forgottenCount > 1 ? 'nt' : ''} dans ta garde-robe.
        Et si tu les ressortais ?
      </p>
      <Button
        variant={ButtonVariant.Ghost}
        onClick={() => onShowForgotten(WardrobeSortOrder.LeastRecentlyWorn)}
      >
        Voir les plus oubliées
      </Button>
    </aside>
  );
}
