import type { PieceDetail } from '../../types/piece';
import { formatPageTitle } from '../../utils/format';
import { PieceFacts } from './PieceFacts';
import { PieceGallery } from './PieceGallery';
import { PieceSummary } from './PieceSummary';
import styles from './PieceDetailView.module.css';

interface PieceDetailViewProps {
  piece: PieceDetail;
}

export function PieceDetailView({ piece }: PieceDetailViewProps) {
  return (
    <article className={styles.layout}>
      <title>{formatPageTitle(piece.title)}</title>
      <PieceGallery key={piece.id} images={piece.images} title={piece.title} />
      <div>
        <PieceSummary piece={piece} />
        <PieceFacts piece={piece} />
      </div>
    </article>
  );
}
