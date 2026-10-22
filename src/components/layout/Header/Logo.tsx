import { Link } from 'react-router';
import { ROUTES } from '../../../routes';
import styles from './Logo.module.css';

export function Logo() {
  return (
    <Link className={styles.logo} to={ROUTES.home} aria-label="Cintré, retour à l'accueil">
      <img src="/favicon.svg" alt="" width={32} height={32} />
      <span>Cintré</span>
    </Link>
  );
}
