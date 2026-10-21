import { Link } from 'react-router';
import { ROUTES } from '../../routes';
import { Logo } from './Logo';
import { MainNav } from './MainNav';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo />
        <MainNav />
        <Link className={styles.addButton} to={ROUTES.addPiece}>
          + Ajouter une pièce
        </Link>
      </div>
    </header>
  );
}
