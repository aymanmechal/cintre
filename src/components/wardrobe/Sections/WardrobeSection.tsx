import type { ReactNode } from 'react';
import { formatPieceCount } from '../../../utils/format';
import styles from './WardrobeSection.module.css';

interface WardrobeSectionProps {
  title: string;
  count: number;
  children: ReactNode;
}

export function WardrobeSection({ title, count, children }: WardrobeSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>{title}</h2>
        <span className={styles.count}>{formatPieceCount(count)}</span>
      </div>
      {children}
    </section>
  );
}
