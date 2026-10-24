import { ROUTES } from '../../../shared/routes';

export interface FooterLink {
  to: string;
  label: string;
}

export const FOOTER_LINKS: readonly FooterLink[] = [
  { to: ROUTES.stylist, label: '🪄 Mon styliste' },
  { to: ROUTES.styleProfile, label: '🎭 Mon profil de style' },
  { to: ROUTES.stats, label: '📊 Mes chiffres' },
  { to: ROUTES.wrapped, label: '🎁 Mon bilan' },
  { to: ROUTES.lookbook, label: '📖 Mon lookbook' },
  { to: ROUTES.compatibility, label: '🔗 Mes associations' },
  { to: ROUTES.account, label: '☁️ Mon compte' },
  { to: ROUTES.backup, label: '💾 Sauvegarder mes données' },
];
