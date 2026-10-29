import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { ME_LINKS, ME_SECTIONS, ME_SECTION_TITLES, MeCounter } from '../constants/meLinks';
import type { MeSectionView } from '../types/me';
import { selectVisibleMeLinks } from '../utils/meLinks';

export function useMeSections(): readonly MeSectionView[] {
  const { trash, archive } = useWardrobe();
  const counts: Record<MeCounter, number> = {
    [MeCounter.Archive]: archive.length,
    [MeCounter.Trash]: trash.length,
  };

  return ME_SECTIONS.map((section) => ({
    section,
    title: ME_SECTION_TITLES[section],
    links: selectVisibleMeLinks(ME_LINKS, section).map((link) => ({
      ...link,
      count: link.counter ? counts[link.counter] : 0,
    })),
  }));
}
