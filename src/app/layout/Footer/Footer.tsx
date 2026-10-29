import { SaveIndicator } from './SaveIndicator';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.wordmark} aria-hidden="true">
        Cintré
      </p>
      <div className={styles.status}>
        <p>Cintré · ta garde-robe, enfin visible.</p>
        <SaveIndicator />
      </div>
    </footer>
  );
}
