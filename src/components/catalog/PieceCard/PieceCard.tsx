import { buildPieceUrl } from '../../../routes';
import type { Piece } from '../../../types/piece';
import { getCategoryLabel } from '../../../utils/categories';
import { formatBrand, formatPrice } from '../../../utils/format';
import { PieceCardBody } from './PieceCardBody';
import { PieceCardMedia } from './PieceCardMedia';
import styles from './PieceCard.module.css';

interface PieceCardProps {
  piece: Piece;
}

export function PieceCard({ piece }: PieceCardProps) {
  return (
    <article className={styles.card}>
      <PieceCardMedia imageUrl={piece.thumbnail} categoryLabel={getCategoryLabel(piece.category)} />
      <PieceCardBody
        brand={formatBrand(piece.brand)}
        title={piece.title}
        price={formatPrice(piece.price)}
        detailUrl={buildPieceUrl(piece.id)}
      />
    </article>
  );
}
