import { ROUTES } from '../../../../shared/routes';
import { ButtonLink } from '../../../../shared/ui/Button/ButtonLink';
import { ButtonVariant } from '../../../../shared/ui/Button/Button';
import { useWardrobe } from '../../context/useWardrobe';
import styles from './TrashLink.module.css';

export function TrashLink() {
  const { trash, archive } = useWardrobe();
  if (trash.length === 0 && archive.length === 0) return null;

  return (
    <div className={styles.position}>
      {archive.length > 0 && (
        <ButtonLink to={ROUTES.archive} variant={ButtonVariant.Ghost}>
          📦 Archives ({archive.length})
        </ButtonLink>
      )}
      {trash.length > 0 && (
        <ButtonLink to={ROUTES.trash} variant={ButtonVariant.Ghost}>
          🗑 Corbeille ({trash.length})
        </ButtonLink>
      )}
    </div>
  );
}
