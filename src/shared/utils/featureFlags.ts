import { AppFeature, V1_FEATURES } from '../constants/features';

const SHOW_ALL_FEATURES = import.meta.env.VITE_SHOW_ALL_FEATURES === 'true';

export function isFeatureVisible(feature: AppFeature): boolean {
  return SHOW_ALL_FEATURES || V1_FEATURES.includes(feature);
}
