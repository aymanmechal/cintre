import type { PieceDetail } from '../../../types/piece';
import { formatPageTitle } from '../../../utils/format';
import { OwnershipPicker } from '../../wardrobe/OwnershipPicker/OwnershipPicker';
import { PieceFacts } from '../Facts/PieceFacts';
import { PieceGallery } from '../Gallery/PieceGallery';
import { PieceSummary } from '../Summary/PieceSummary';
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
        <OwnershipPicker piece={piece} />
        <PieceFacts piece={piece} />
      </div>
    </article>
  );
}
