import { AddPieceLink } from './AddPieceLink';
import { Logo } from './Logo';
import { MainNav } from '../Navigation/MainNav';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo />
        <MainNav />
        <div className={styles.actions}>
          <AddPieceLink />
        </div>
      </div>
    </header>
  );
}
