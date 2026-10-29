import { useInstallPrompt } from '../../../../shared/pwa/useInstallPrompt';
import styles from './InstallAppButton.module.css';

export function InstallAppButton() {
  const { canInstall, install } = useInstallPrompt();

  if (!canInstall) return null;

  return (
    <button type="button" className={styles.button} onClick={install}>
      📲 Installer Cintré sur cet appareil
    </button>
  );
}
