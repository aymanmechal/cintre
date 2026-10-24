import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { useMyShares } from '../../hooks/useMyShares';
import { formatVoteSummary } from '../../utils/sharing';
import styles from './MySharesPanel.module.css';

export function MySharesPanel() {
  const { shares, copiedId, load, copy, stop } = useMyShares();

  return (
    <details className={styles.panel} onToggle={(event) => event.currentTarget.open && load()}>
      <summary className={styles.summary}>🔗 Mes tenues partagées</summary>
      {shares === null && <p>Un instant…</p>}
      {shares?.length === 0 && (
        <p className={styles.hint}>Rien de partagé pour l’instant. Tes tenues restent privées.</p>
      )}
      <ul className={styles.list}>
        {shares?.map((share) => (
          <li key={share.id} className={styles.row}>
            <span className={styles.title}>{share.title}</span>
            <span className={styles.votes}>{formatVoteSummary(share.votes)}</span>
            <Button variant={ButtonVariant.Ghost} onClick={() => copy(share.id)}>
              {copiedId === share.id ? 'Copié ✓' : 'Copier le lien'}
            </Button>
            <Button
              variant={ButtonVariant.Danger}
              aria-label={`Arrêter le partage de ${share.title}`}
              onClick={() => stop(share.id)}
            >
              Arrêter
            </Button>
          </li>
        ))}
      </ul>
    </details>
  );
}
