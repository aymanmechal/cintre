import { isFeatureVisible } from '../../../shared/utils/featureFlags';
import type { MeLink, MeSection } from '../constants/meLinks';

export function selectVisibleMeLinks(
  links: readonly MeLink[],
  section: MeSection,
): readonly MeLink[] {
  return links.filter(
    (link) =>
      link.section === section && (link.feature === undefined || isFeatureVisible(link.feature)),
  );
}
