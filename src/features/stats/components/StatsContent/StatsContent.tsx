import type { WardrobeStats } from '../../types/stats';
import { DependenceCard } from '../DependenceCard/DependenceCard';
import { BudgetCard } from '../BudgetCard/BudgetCard';
import { PieceRanking } from '../PieceRanking/PieceRanking';
import { StatsSummary } from '../StatsSummary/StatsSummary';
import styles from './StatsContent.module.css';

interface StatsContentProps {
  stats: WardrobeStats;
}

export function StatsContent({ stats }: StatsContentProps) {
  return (
    <div className={styles.content}>
      <StatsSummary stats={stats} />
      <BudgetCard />
      <DependenceCard />
      <PieceRanking
        title="Les plus portées"
        emptyMessage="Note des tenues dans le calendrier pour voir tes préférées."
        pieceStats={stats.mostWorn}
      />
      <PieceRanking
        title="Les plus rentables"
        emptyMessage="Pas encore de pièce portée."
        pieceStats={stats.bestValue}
      />
      <PieceRanking
        title="À rentabiliser"
        emptyMessage="Rien à signaler."
        pieceStats={stats.toAmortize}
      />
    </div>
  );
}
