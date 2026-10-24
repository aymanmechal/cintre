import { Link } from 'react-router';
import { buildEditPieceUrl } from '../../../../shared/routes';
import { formatPrice } from '../../../../shared/utils/format';
import type { PieceStat } from '../../types/stats';
import { formatWearCount } from '../../utils/stats';
import styles from './PieceRanking.module.css';

interface PieceRankingProps {
  title: string;
  emptyMessage: string;
  pieceStats: readonly PieceStat[];
}

function describeCost(stat: PieceStat): string {
  if (stat.costPerWear === null) return `${formatPrice(stat.item.piece.price)} à rentabiliser`;
  return `${formatPrice(stat.costPerWear)} par port`;
}

export function PieceRanking({ title, emptyMessage, pieceStats }: PieceRankingProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      {pieceStats.length === 0 ? (
        <p className={styles.empty}>{emptyMessage}</p>
      ) : (
        <ol className={styles.list}>
          {pieceStats.map((stat) => (
            <li key={stat.item.piece.id}>
              <Link className={styles.row} to={buildEditPieceUrl(stat.item.piece.id)}>
                <span className={styles.name}>{stat.item.piece.title}</span>
                <span className={styles.detail}>
                  {formatWearCount(stat.wearCount)} · {describeCost(stat)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
