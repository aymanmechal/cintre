import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './Layout.module.css';

/** Gabarit commun : en-tête + contenu de la page courante (Outlet) + pied de page. */
export function Layout() {
  return (
    <div className={styles.layout}>
      <a className={styles.skipLink} href="#contenu">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
