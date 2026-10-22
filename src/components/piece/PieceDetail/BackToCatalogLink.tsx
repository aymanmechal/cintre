import { Link } from 'react-router';
import { ROUTES } from '../../../routes';
import styles from './BackToCatalogLink.module.css';

export function BackToCatalogLink() {
  return (
    <Link className={styles.backLink} to={ROUTES.catalog}>
      ← Retour au catalogue
    </Link>
  );
}
