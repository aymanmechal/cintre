import { Outlet } from 'react-router';
import { useSyncWornOutfits } from '../../../hooks/useSyncWornOutfits';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { SkipLink } from './SkipLink';
import styles from './Layout.module.css';

const MAIN_CONTENT_ID = 'contenu';

export function Layout() {
  useSyncWornOutfits();

  return (
    <div className={styles.layout}>
      <SkipLink targetId={MAIN_CONTENT_ID} />
      <Header />
      <main id={MAIN_CONTENT_ID} className={styles.main} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
