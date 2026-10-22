import type { PieceDetail } from '../../../../shared/pieces/types/piece';
import { buildPieceFacts } from '../../utils/pieceFacts';
import { PieceFact } from './PieceFact';
import styles from './PieceFacts.module.css';

interface PieceFactsProps {
  piece: PieceDetail;
}

export function PieceFacts({ piece }: PieceFactsProps) {
  return (
    <dl className={styles.facts}>
      {buildPieceFacts(piece).map((fact) => (
        <PieceFact key={fact.label} label={fact.label} value={fact.value} />
      ))}
    </dl>
  );
}
