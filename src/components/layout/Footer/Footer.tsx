import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Cintré — ta garde-robe, enfin visible.</p>
      <p className={styles.source}>Données catalogue : DummyJSON (fictives)</p>
    </footer>
  );
}
