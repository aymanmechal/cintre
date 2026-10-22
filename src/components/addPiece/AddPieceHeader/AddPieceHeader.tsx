import styles from './AddPieceHeader.module.css';

export function AddPieceHeader() {
  return (
    <header className={styles.header}>
      <h1>Ajouter une pièce</h1>
      <p className={styles.subtitle}>
        Une pièce absente du catalogue ? Décris-la et range-la directement dans ta garde-robe.
      </p>
    </header>
  );
}
