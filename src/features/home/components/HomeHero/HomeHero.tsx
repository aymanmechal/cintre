import { ROUTES } from '../../../../shared/routes';
import { ButtonLink } from '../../../../shared/ui/Button/ButtonLink';
import { ButtonVariant } from '../../../../shared/ui/Button/Button';
import styles from './HomeHero.module.css';

export function HomeHero() {
  return (
    <header className={styles.hero}>
      <h1 className={styles.title}>Ta garde-robe, enfin visible.</h1>
      <p className={styles.subtitle}>
        Range ce que tu possèdes, note ce qui te fait envie et invente des tenues sans jamais
        oublier ce qui dort au fond du tiroir.
      </p>
      <div className={styles.actions}>
        <ButtonLink to={ROUTES.wardrobe} variant={ButtonVariant.Action}>
          Ma garde-robe
        </ButtonLink>
        <ButtonLink to={ROUTES.catalog}>Parcourir le catalogue</ButtonLink>
      </div>
    </header>
  );
}
