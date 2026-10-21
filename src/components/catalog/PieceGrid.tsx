import type { Piece } from '../../types/piece';
import { PieceCard } from './PieceCard';
import styles from './PieceGrid.module.css';

interface PieceGridProps {
  pieces: readonly Piece[];
}

export function PieceGrid({ pieces }: PieceGridProps) {
  return (
    <ul className={styles.grid}>
      {pieces.map((piece) => (
        <li key={piece.id}>
          <PieceCard piece={piece} />
        </li>
      ))}
    </ul>
  );
}
