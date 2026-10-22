import { OUTFIT_SLOT_LABELS, type OutfitSlot } from '../../../../constants/outfits';
import { ROUTES } from '../../../../routes';
import { ButtonLink } from '../../../ui/Button/ButtonLink';
import { ButtonVariant } from '../../../ui/Button/buttonVariant';
import styles from './EmptyShelf.module.css';

interface EmptyShelfProps {
  slot: OutfitSlot;
}

export function EmptyShelf({ slot }: EmptyShelfProps) {
  return (
    <div className={styles.empty}>
      <p className={styles.message}>Rien dans « {OUTFIT_SLOT_LABELS[slot]} » pour l’instant.</p>
      <ButtonLink to={ROUTES.catalog} variant={ButtonVariant.Ghost}>
        Trouver une pièce
      </ButtonLink>
    </div>
  );
}
