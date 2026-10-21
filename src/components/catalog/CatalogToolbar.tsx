import { GenderToggle } from './GenderToggle';
import { SearchBar } from './SearchBar';
import { TypeSelect } from './TypeSelect';
import styles from './CatalogToolbar.module.css';

export function CatalogToolbar() {
  return (
    <div className={styles.toolbar}>
      <SearchBar />
      <TypeSelect />
      <GenderToggle />
    </div>
  );
}
