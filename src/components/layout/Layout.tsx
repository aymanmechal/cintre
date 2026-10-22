import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './Layout.module.css';

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
