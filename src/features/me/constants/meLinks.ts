import { AppFeature } from '../../../shared/constants/features';
import { ROUTES } from '../../../shared/routes';

export enum MeSection {
  Discover = 'discover',
  Settings = 'settings',
}

export enum MeCounter {
  Archive = 'archive',
  Trash = 'trash',
}

export interface MeLink {
  section: MeSection;
  to: string;
  emoji: string;
  label: string;
  description: string;
  feature?: AppFeature;
  counter?: MeCounter;
}

export const ME_SECTIONS: readonly MeSection[] = Object.values(MeSection);

export const ME_SECTION_TITLES: Record<MeSection, string> = {
  [MeSection.Discover]: 'Ma garde-robe en un coup d’œil',
  [MeSection.Settings]: 'Mes réglages',
};

export const ME_LINKS: readonly MeLink[] = [
  {
    section: MeSection.Discover,
    feature: AppFeature.StyleProfile,
    to: ROUTES.styleProfile,
    emoji: '🎭',
    label: 'Mon style',
    description: 'Tes couleurs et tes pièces fétiches',
  },
  {
    section: MeSection.Discover,
    feature: AppFeature.Stats,
    to: ROUTES.stats,
    emoji: '📊',
    label: 'Mes chiffres',
    description: 'Coût par port, budget, habitudes',
  },
  {
    section: MeSection.Discover,
    feature: AppFeature.Wrapped,
    to: ROUTES.wrapped,
    emoji: '🎁',
    label: 'Mon bilan',
    description: 'Tes pièces et couleurs stars',
  },
  {
    section: MeSection.Discover,
    feature: AppFeature.Lookbook,
    to: ROUTES.lookbook,
    emoji: '📖',
    label: 'Mon lookbook',
    description: 'Toutes tes tenues à feuilleter',
  },
  {
    section: MeSection.Discover,
    feature: AppFeature.Compatibility,
    to: ROUTES.compatibility,
    emoji: '🔗',
    label: 'Mes associations',
    description: 'Les pièces qui vont ensemble',
  },
  {
    section: MeSection.Discover,
    feature: AppFeature.Stylist,
    to: ROUTES.stylist,
    emoji: '🪄',
    label: 'Mon styliste',
    description: 'Demande une tenue à l’IA',
  },
  {
    section: MeSection.Discover,
    feature: AppFeature.Suitcase,
    to: ROUTES.suitcase,
    emoji: '🧳',
    label: 'Ma valise',
    description: 'Prépare un voyage sans rien oublier',
  },
  {
    section: MeSection.Settings,
    feature: AppFeature.Account,
    to: ROUTES.account,
    emoji: '☁️',
    label: 'Mon compte',
    description: 'Connexion et synchro entre appareils',
  },
  {
    section: MeSection.Settings,
    counter: MeCounter.Archive,
    to: ROUTES.archive,
    emoji: '📦',
    label: 'Archives',
    description: 'Les pièces vendues ou données',
  },
  {
    section: MeSection.Settings,
    counter: MeCounter.Trash,
    to: ROUTES.trash,
    emoji: '🗑',
    label: 'Corbeille',
    description: '30 jours pour changer d’avis',
  },
  {
    section: MeSection.Settings,
    feature: AppFeature.Backup,
    to: ROUTES.backup,
    emoji: '💾',
    label: 'Sauvegarde',
    description: 'Exporter ou importer tes données',
  },
];
