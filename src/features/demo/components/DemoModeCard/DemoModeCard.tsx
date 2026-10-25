import { AppFeature } from '../../../../shared/constants/features';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { isFeatureVisible } from '../../../../shared/utils/featureFlags';
import { useDemoMode } from '../../hooks/useDemoMode';
import styles from './DemoModeCard.module.css';

export function DemoModeCard() {
  const { canStartDemo, isDemoActive, startDemo, stopDemo } = useDemoMode();

  if (!isFeatureVisible(AppFeature.Demo)) return null;

  if (isDemoActive) {
    return (
      <section className={styles.card} aria-label="Mode démo">
        <p className={styles.text}>Tu explores la garde-robe de démo.</p>
        <Button variant={ButtonVariant.Ghost} onClick={stopDemo}>
          Retirer la démo
        </Button>
      </section>
    );
  }

  if (!canStartDemo) return null;

  return (
    <section className={styles.card} aria-label="Mode démo">
      <p className={styles.text}>
        Pas encore de pièces ? Découvre Cintré avec une garde-robe fictive.
      </p>
      <Button variant={ButtonVariant.Action} onClick={startDemo}>
        Essayer avec une démo
      </Button>
    </section>
  );
}
