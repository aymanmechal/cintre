import { PieceTypeSelect } from './PieceTypeSelect';
import { SearchBar } from './SearchBar';
import styles from './CatalogToolbar.module.css';

export function CatalogToolbar() {
  return (
    <div className={styles.toolbar}>
      <SearchBar />
      <PieceTypeSelect />
    </div>
  );
}
