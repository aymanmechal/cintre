import { Link } from 'react-router';
import { FOOTER_LINKS } from './footerLinks';
import { InstallAppButton } from './InstallAppButton';
import { SaveIndicator } from './SaveIndicator';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.wordmark} aria-hidden="true">
        Cintré
      </p>
      <nav className={styles.links} aria-label="Plus de pages">
        {FOOTER_LINKS.map((link) => (
          <Link key={link.to} className={styles.pill} to={link.to}>
            {link.label}
          </Link>
        ))}
        <InstallAppButton />
      </nav>
      <div className={styles.status}>
        <p>Cintré · ta garde-robe, enfin visible.</p>
        <SaveIndicator />
      </div>
    </footer>
  );
}
