import { PIECE_TYPE_LABELS, PIECE_TYPES } from '../../../constants/categories';
import { ALL_PIECE_TYPES } from '../../../contexts/catalogFilters/catalogFiltersReducer';
import { useCatalogFilters } from '../../../contexts/catalogFilters/useCatalogFilters';
import { toPieceTypeFilter } from '../../../utils/categories';
import styles from './PieceTypeSelect.module.css';

export function PieceTypeSelect() {
  const { filters, changePieceType } = useCatalogFilters();

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor="catalog-piece-type">
        Type
      </label>
      <select
        id="catalog-piece-type"
        className={styles.select}
        value={filters.pieceType}
        onChange={(event) => changePieceType(toPieceTypeFilter(event.target.value))}
      >
        <option value={ALL_PIECE_TYPES}>Tous les types</option>
        {PIECE_TYPES.map((pieceType) => (
          <option key={pieceType} value={pieceType}>
            {PIECE_TYPE_LABELS[pieceType]}
          </option>
        ))}
      </select>
    </div>
  );
}
