import type { PieceDetail } from '../../../../shared/pieces/types/piece';
import { formatPageTitle } from '../../../../shared/utils/format';
import { OwnershipPicker } from '../../../wardrobe/components/OwnershipPicker/OwnershipPicker';
import { PieceFacts } from '../Facts/PieceFacts';
import { PieceGallery } from '../Gallery/PieceGallery';
import { PieceSummary } from '../Summary/PieceSummary';
import styles from './PieceDetailView.module.css';

interface PieceDetailViewProps {
  piece: PieceDetail;
}

export function PieceDetailView({ piece }: PieceDetailViewProps) {
  return (
    <article className={styles.layout} data-piece-type={piece.pieceType}>
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
