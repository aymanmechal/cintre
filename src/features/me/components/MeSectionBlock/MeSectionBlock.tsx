import type { MeSectionView } from '../../types/me';
import { MeLinkTile } from '../MeLinkTile/MeLinkTile';
import styles from './MeSectionBlock.module.css';

interface MeSectionBlockProps {
  view: MeSectionView;
}

export function MeSectionBlock({ view }: MeSectionBlockProps) {
  const titleId = `me-section-${view.section}`;

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        {view.title}
      </h2>
      <ul className={styles.grid}>
        {view.links.map((link) => (
          <li key={link.to}>
            <MeLinkTile link={link} />
          </li>
        ))}
      </ul>
    </section>
  );
}
