import { formatPieceCount } from '../../../utils/format';
import styles from './WardrobeHeader.module.css';

interface WardrobeHeaderProps {
  ownedCount: number;
  wantedCount: number;
}

export function WardrobeHeader({ ownedCount, wantedCount }: WardrobeHeaderProps) {
  return (
    <header className={styles.header}>
      <h1>Ma garde-robe</h1>
      <p className={styles.subtitle}>
        {formatPieceCount(ownedCount)} à moi · {formatPieceCount(wantedCount)} en envie
      </p>
    </header>
  );
}
