import type { GenderFilter } from '../../contexts/catalogFilters/catalogFiltersReducer';
import { useCatalogFilters } from '../../contexts/catalogFilters/useCatalogFilters';
import styles from './GenderToggle.module.css';

const GENDER_OPTIONS: readonly { value: GenderFilter; label: string }[] = [
  { value: 'tous', label: 'Tous' },
  { value: 'homme', label: 'Homme' },
  { value: 'femme', label: 'Femme' },
];

/** aria-pressed indique au lecteur d'écran quel bouton est actif. */
export function GenderToggle() {
  const { filters, setGender } = useCatalogFilters();

  return (
    <div className={styles.toggle} role="group" aria-label="Genre">
      {GENDER_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={styles.option}
          type="button"
          aria-pressed={filters.gender === option.value}
          onClick={() => setGender(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
