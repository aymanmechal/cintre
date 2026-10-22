import { useCatalogFilters } from '../../context/useCatalogFilters';
import styles from './SearchBar.module.css';

export function SearchBar() {
  const { filters, changeQuery } = useCatalogFilters();

  return (
    <div className={styles.search}>
      <label className="visually-hidden" htmlFor="catalog-search">
        Rechercher une pièce
      </label>
      <input
        id="catalog-search"
        className={styles.input}
        type="search"
        placeholder="Rechercher une pièce, une marque, un type…"
        value={filters.query}
        onChange={(event) => changeQuery(event.target.value)}
      />
    </div>
  );
}
