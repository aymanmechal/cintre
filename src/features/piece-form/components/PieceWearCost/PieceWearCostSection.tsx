import { useWearCounts } from '../../../calendar/hooks/useWearCounts';
import { getWearCount } from '../../../calendar/utils/wearCounts';
import { computeCostPerWear, formatWearCount } from '../../../stats/utils/stats';
import type { Piece } from '../../../../shared/pieces/types/piece';
import { formatPrice } from '../../../../shared/utils/format';
import styles from './PieceWearCostSection.module.css';

interface PieceWearCostSectionProps {
  piece: Piece;
}

function describeCost(piece: Piece, wearCount: number): string {
  const costPerWear = computeCostPerWear(piece.price, wearCount);
  if (costPerWear === null) return `${formatPrice(piece.price)} à rentabiliser : porte-la !`;
  return `${formatPrice(costPerWear)} par port`;
}

export function PieceWearCostSection({ piece }: PieceWearCostSectionProps) {
  const wearCount = getWearCount(useWearCounts(), piece.id);

  return (
    <section className={styles.section} aria-labelledby="piece-wear-cost-title">
      <h2 id="piece-wear-cost-title" className={styles.title}>
        Coût par port
      </h2>
      <p className={styles.message}>
        {formatWearCount(wearCount)} · {describeCost(piece, wearCount)}
      </p>
    </section>
  );
}
