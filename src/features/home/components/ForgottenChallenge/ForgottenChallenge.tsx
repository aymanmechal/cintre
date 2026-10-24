import { useForgottenChallenge } from '../../hooks/useForgottenChallenge';
import { buildOutfitIdeasUrl } from '../../../../shared/routes';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { ButtonLink } from '../../../../shared/ui/Button/ButtonLink';
import { PieceImage } from '../../../../shared/ui/PieceImage/PieceImage';
import { formatLastWorn } from '../../../wardrobe/utils/wornDates';
import styles from './ForgottenChallenge.module.css';

export function ForgottenChallenge() {
  const { item, today, canShuffle, shuffle } = useForgottenChallenge();

  if (item === null) return null;
  const { piece } = item;

  return (
    <section className={styles.challenge} aria-labelledby="forgotten-challenge-title">
      <div className={styles.media} data-piece-type={piece.pieceType}>
        <PieceImage imageUrl={piece.thumbnail} photoId={piece.photoId} />
      </div>
      <div className={styles.content}>
        <h2 id="forgotten-challenge-title" className={styles.title}>
          Le défi du jour
        </h2>
        <p className={styles.text}>
          Porte « {piece.title} » aujourd’hui. {formatLastWorn(item.lastWornOn, today)}.
        </p>
        <div className={styles.actions}>
          <ButtonLink to={buildOutfitIdeasUrl(piece.id)} variant={ButtonVariant.Action}>
            Trouver une tenue
          </ButtonLink>
          {canShuffle && (
            <Button variant={ButtonVariant.Ghost} onClick={shuffle}>
              Un autre défi
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
