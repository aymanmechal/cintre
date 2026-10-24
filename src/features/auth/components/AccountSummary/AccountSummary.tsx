import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { SYNC_STATUS_MESSAGES } from '../../../sync/constants/sync';
import { useSyncStatus } from '../../../sync/hooks/useSyncStatus';
import type { AuthUser } from '../../types/auth';
import styles from './AccountSummary.module.css';

interface AccountSummaryProps {
  user: AuthUser;
  onSignOut: () => void;
}

export function AccountSummary({ user, onSignOut }: AccountSummaryProps) {
  const syncStatus = useSyncStatus();

  return (
    <article className={styles.card}>
      <h2 className={styles.title}>Salut {user.nickname || 'toi'} 👋</h2>
      <p className={styles.email}>{user.email}</p>
      <p className={styles.sync} role="status">
        {SYNC_STATUS_MESSAGES[syncStatus]}
      </p>
      <p className={styles.email}>
        En te déconnectant, ta garde-robe quitte ce téléphone mais reste en ligne.
      </p>
      <Button variant={ButtonVariant.Ghost} onClick={onSignOut}>
        Me déconnecter
      </Button>
    </article>
  );
}
