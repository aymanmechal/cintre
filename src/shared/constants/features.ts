export enum AppFeature {
  Catalog = 'catalog',
  Wardrobe = 'wardrobe',
  Outfits = 'outfits',
  Calendar = 'calendar',
  Suitcase = 'suitcase',
  Stats = 'stats',
  Wrapped = 'wrapped',
  Lookbook = 'lookbook',
  Compatibility = 'compatibility',
  StyleProfile = 'styleProfile',
  Stylist = 'stylist',
  Backup = 'backup',
  Account = 'account',
  Demo = 'demo',
}

export const V1_FEATURES: readonly AppFeature[] = [
  AppFeature.Catalog,
  AppFeature.Wardrobe,
  AppFeature.Outfits,
  AppFeature.Calendar,
  AppFeature.Stats,
  AppFeature.Wrapped,
  AppFeature.Lookbook,
  AppFeature.StyleProfile,
  AppFeature.Account,
];
