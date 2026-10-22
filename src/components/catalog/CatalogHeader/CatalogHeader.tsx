import styles from './CatalogHeader.module.css';

export function CatalogHeader() {
  return (
    <header className={styles.header}>
      <h1>Catalogue</h1>
      <p className={styles.subtitle}>Trouve une pièce à ajouter à ta garde-robe ou à tes envies.</p>
    </header>
  );
}
