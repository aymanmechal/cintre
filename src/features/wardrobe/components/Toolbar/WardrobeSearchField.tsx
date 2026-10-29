import styles from './WardrobeSearchField.module.css';

interface WardrobeSearchFieldProps {
  value: string;
  onChange: (search: string) => void;
}

export function WardrobeSearchField({ value, onChange }: WardrobeSearchFieldProps) {
  return (
    <div className={styles.field}>
      <label className="visually-hidden" htmlFor="wardrobe-search">
        Rechercher
      </label>
      <span className={styles.icon} aria-hidden="true">
        🔍
      </span>
      <input
        id="wardrobe-search"
        data-testid="wardrobe-search"
        className={styles.input}
        type="text"
        placeholder="Rechercher un article, une marque, une couleur…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value !== '' && (
        <button
          type="button"
          className={styles.clear}
          aria-label="Effacer la recherche"
          onClick={() => onChange('')}
        >
          ✕
        </button>
      )}
    </div>
  );
}
