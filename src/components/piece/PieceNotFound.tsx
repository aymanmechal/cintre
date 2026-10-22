import { Link } from 'react-router';
import { ROUTES } from '../../routes';
import { EmptyState } from '../ui/EmptyState';
import styles from './PieceNotFound.module.css';

export function PieceNotFound() {
  return (
    <EmptyState
      title="Pièce introuvable"
      message="Cette pièce n’existe pas ou ne fait pas partie du catalogue."
      action={
        <Link className={styles.catalogLink} to={ROUTES.catalog}>
          Voir le catalogue
        </Link>
      }
    />
  );
}
