import type { MeLink, MeSection } from '../constants/meLinks';

export interface MeLinkView extends MeLink {
  count: number;
}

export interface MeSectionView {
  section: MeSection;
  title: string;
  links: readonly MeLinkView[];
}
