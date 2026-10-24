import { ROUTES } from '../../../../../shared/routes';
import { ButtonVariant } from '../../../../../shared/ui/Button/Button';
import { ButtonLink } from '../../../../../shared/ui/Button/ButtonLink';

export function StylistLink() {
  return (
    <ButtonLink to={ROUTES.stylist} variant={ButtonVariant.Ghost}>
      🪄 Demander au styliste
    </ButtonLink>
  );
}
