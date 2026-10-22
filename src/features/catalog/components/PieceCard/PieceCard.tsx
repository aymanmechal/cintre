import { PIECE_TYPE_LABELS } from '../../../../shared/pieces/constants/categories';
import { buildPieceUrl } from '../../../../shared/routes';
import type { Piece } from '../../../../shared/pieces/types/piece';
import { formatBrand, formatPrice } from '../../../../shared/utils/format';
import { OwnershipPicker } from '../../../wardrobe/components/OwnershipPicker/OwnershipPicker';
import { OwnershipPickerSize } from '../../../wardrobe/components/OwnershipPicker/ownershipPickerSize';
import { PieceCardBody } from './PieceCardBody';
import { PieceCardMedia } from './PieceCardMedia';
import styles from './PieceCard.module.css';

interface PieceCardProps {
  piece: Piece;
}

export function PieceCard({ piece }: PieceCardProps) {
  return (
    <article className={styles.card} data-piece-type={piece.pieceType}>
      <PieceCardMedia
        imageUrl={piece.thumbnail}
        categoryLabel={PIECE_TYPE_LABELS[piece.pieceType]}
        action={<OwnershipPicker piece={piece} size={OwnershipPickerSize.Compact} />}
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
