import { OUTFIT_SLOT_LABELS, type OutfitSlot } from '../../../constants/outfits';
import { ROUTES } from '../../../../../shared/routes';
import { ButtonLink } from '../../../../../shared/ui/Button/ButtonLink';
import { ButtonVariant } from '../../../../../shared/ui/Button/Button';
import styles from './EmptyShelf.module.css';

interface EmptyShelfProps {
  slot: OutfitSlot;
}

export function EmptyShelf({ slot }: EmptyShelfProps) {
  return (
    <div className={styles.empty}>
      <p className={styles.message}>Rien dans « {OUTFIT_SLOT_LABELS[slot]} » pour l’instant.</p>
      <ButtonLink to={ROUTES.addPiece} variant={ButtonVariant.Ghost}>
        Ajouter une pièce
      </ButtonLink>
    </div>
  );
}
