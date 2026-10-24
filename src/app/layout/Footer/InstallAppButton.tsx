import { useInstallPrompt } from '../../../shared/pwa/useInstallPrompt';
import styles from './Footer.module.css';

export function InstallAppButton() {
  const { canInstall, install } = useInstallPrompt();

  if (!canInstall) return null;

  return (
    <button type="button" className={styles.installButton} onClick={install}>
      📲 Installer Cintré
    </button>
  );
}
