import { Outlet } from 'react-router';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { SkipLink } from './SkipLink';
import styles from './Layout.module.css';

const MAIN_CONTENT_ID = 'contenu';

export function Layout() {
  return (
    <div className={styles.layout}>
      <SkipLink targetId={MAIN_CONTENT_ID} />
      <Header />
      <main id={MAIN_CONTENT_ID} className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
