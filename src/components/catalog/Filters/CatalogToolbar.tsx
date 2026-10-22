import { PieceTypeSelect } from './PieceTypeSelect';
import { SearchBar } from './SearchBar';
import { SortSelect } from './SortSelect';
import styles from './CatalogToolbar.module.css';

export function CatalogToolbar() {
  return (
    <div className={styles.toolbar}>
      <SearchBar />
      <PieceTypeSelect />
      <SortSelect />
    </div>
  );
}
