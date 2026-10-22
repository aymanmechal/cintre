import { PIECE_TYPE_LABELS } from '../../../constants/categories';
import { buildPieceUrl } from '../../../routes';
import type { Piece } from '../../../types/piece';
import { formatBrand, formatPrice } from '../../../utils/format';
import { WardrobeToggleButton } from '../../wardrobe/WardrobeToggleButton/WardrobeToggleButton';
import { PieceCardBody } from './PieceCardBody';
import { PieceCardMedia } from './PieceCardMedia';
import styles from './PieceCard.module.css';

interface PieceCardProps {
  piece: Piece;
}

export function PieceCard({ piece }: PieceCardProps) {
  return (
    <article className={styles.card}>
      <PieceCardMedia
        imageUrl={piece.thumbnail}
        categoryLabel={PIECE_TYPE_LABELS[piece.pieceType]}
        action={<WardrobeToggleButton piece={piece} />}
      />
      <PieceCardBody
        brand={formatBrand(piece.brand)}
        title={piece.title}
        price={formatPrice(piece.price)}
        detailUrl={buildPieceUrl(piece.id)}
      />
    </article>
  );
}
