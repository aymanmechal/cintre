import { useCatalogFilters } from '../../contexts/catalogFilters/useCatalogFilters';
import { EmptyState } from '../ui/EmptyState';
import styles from './NoMatchingPieces.module.css';

export function NoMatchingPieces() {
  const { resetFilters } = useCatalogFilters();

  return (
    <EmptyState
      title="Aucune pièce ne correspond"
      message="Essaie un autre mot-clé ou élargis les filtres."
      action={
        <button className={styles.resetButton} type="button" onClick={resetFilters}>
          Effacer les filtres
        </button>
      }
    />
  );
}
