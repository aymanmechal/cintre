import { AppFeature } from '../../../shared/constants/features';
import { ROUTES } from '../../../shared/routes';
import { isFeatureVisible } from '../../../shared/utils/featureFlags';

export interface FooterLink {
  feature: AppFeature;
  to: string;
  label: string;
}

const ALL_FOOTER_LINKS: readonly FooterLink[] = [
  { feature: AppFeature.Stylist, to: ROUTES.stylist, label: '🪄 Mon styliste' },
  { feature: AppFeature.StyleProfile, to: ROUTES.styleProfile, label: '🎭 Mon style' },
  { feature: AppFeature.Stats, to: ROUTES.stats, label: '📊 Mes chiffres' },
  { feature: AppFeature.Wrapped, to: ROUTES.wrapped, label: '🎁 Mon bilan' },
  { feature: AppFeature.Lookbook, to: ROUTES.lookbook, label: '📖 Mon lookbook' },
  { feature: AppFeature.Compatibility, to: ROUTES.compatibility, label: '🔗 Mes associations' },
  { feature: AppFeature.Account, to: ROUTES.account, label: '☁️ Mon compte' },
  { feature: AppFeature.Backup, to: ROUTES.backup, label: '💾 Sauvegarder mes données' },
];

export const FOOTER_LINKS: readonly FooterLink[] = ALL_FOOTER_LINKS.filter((link) =>
  isFeatureVisible(link.feature),
);
