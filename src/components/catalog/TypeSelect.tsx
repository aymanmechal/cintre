import { PIECE_TYPES } from '../../constants/categories';
import type { TypeFilter } from '../../contexts/catalogFilters/catalogFiltersReducer';
import { useCatalogFilters } from '../../contexts/catalogFilters/useCatalogFilters';
import styles from './TypeSelect.module.css';

export function TypeSelect() {
  const { filters, setType } = useCatalogFilters();

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor="catalog-type">
        Type
      </label>
      <select
        id="catalog-type"
        className={styles.select}
        value={filters.type}
        onChange={(event) => setType(event.target.value as TypeFilter)}
      >
        <option value="tous">Tous les types</option>
        {PIECE_TYPES.map((pieceType) => (
          <option key={pieceType.id} value={pieceType.id}>
            {pieceType.label}
          </option>
        ))}
      </select>
    </div>
  );
}
