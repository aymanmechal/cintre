import { useRevealOnMount } from '../../../../shared/hooks/useRevealOnMount';
import { ROUTES } from '../../../../shared/routes';
import type { SavedPiece } from '../../types/pieceForm';
import { formatApiProductId, formatBrand, formatPrice } from '../../../../shared/utils/format';
import { ButtonLink } from '../../../../shared/ui/Button/ButtonLink';
import { ButtonVariant } from '../../../../shared/ui/Button/Button';
import styles from './SaveSuccessCard.module.css';

const SUCCESS_ICON = '✓';

interface SaveSuccessCardProps {
  title: string;
  savedPiece: SavedPiece;
}

export function SaveSuccessCard({ title, savedPiece }: SaveSuccessCardProps) {
  const { piece, apiProductId } = savedPiece;
  const cardRef = useRevealOnMount<HTMLDivElement>();

  return (
    <div ref={cardRef} className={styles.card} role="status">
      <span className={styles.icon} aria-hidden="true">
        {SUCCESS_ICON}
      </span>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p className={styles.piece}>
          {piece.title} · {formatBrand(piece.brand)} · {formatPrice(piece.price)}
        </p>
        <p className={styles.apiId}>{formatApiProductId(apiProductId)}</p>
      </div>
      <ButtonLink to={ROUTES.wardrobe} variant={ButtonVariant.Ghost}>
        Voir ma garde-robe
      </ButtonLink>
    </div>
  );
}
