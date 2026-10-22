import type { PieceDetail } from '../../types/piece';
import { formatStock } from '../../utils/format';
import styles from './PieceFacts.module.css';

interface PieceFactsProps {
  piece: PieceDetail;
}

function buildFacts(piece: PieceDetail) {
  return [
    { label: 'Disponibilité', value: formatStock(piece.stock) },
    { label: 'Livraison', value: piece.shippingInformation },
    { label: 'Garantie', value: piece.warrantyInformation },
    { label: 'Retours', value: piece.returnPolicy },
  ].filter((fact) => fact.value !== '');
}

export function PieceFacts({ piece }: PieceFactsProps) {
  return (
    <dl className={styles.facts}>
      {buildFacts(piece).map((fact) => (
        <div key={fact.label} className={styles.fact}>
          <dt className={styles.label}>{fact.label}</dt>
          <dd className={styles.value}>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
