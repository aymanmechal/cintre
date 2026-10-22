import styles from './WardrobeHeader.module.css';

export function WardrobeHeader() {
  return (
    <header className={styles.header}>
      <h1>Ma garde-robe</h1>
      <p className={styles.subtitle}>Retrouve ce que tu possèdes, et surtout où c’est rangé.</p>
    </header>
  );
}
