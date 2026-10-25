import { AppFeature } from '../../../../../shared/constants/features';
import { ROUTES } from '../../../../../shared/routes';
import { ButtonVariant } from '../../../../../shared/ui/Button/Button';
import { ButtonLink } from '../../../../../shared/ui/Button/ButtonLink';
import { isFeatureVisible } from '../../../../../shared/utils/featureFlags';

export function StylistLink() {
  if (!isFeatureVisible(AppFeature.Stylist)) return null;
  return (
    <ButtonLink to={ROUTES.stylist} variant={ButtonVariant.Ghost}>
      🪄 Demander au styliste
    </ButtonLink>
  );
}
