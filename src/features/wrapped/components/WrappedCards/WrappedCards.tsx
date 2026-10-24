import { Link } from 'react-router';
import type { Wrapped } from '../../types/wrapped';
import { buildWrappedHighlights } from '../../utils/wrappedHighlights';
import styles from './WrappedCards.module.css';

interface WrappedCardsProps {
  wrapped: Wrapped;
}

export function WrappedCards({ wrapped }: WrappedCardsProps) {
  return (
    <dl className={styles.cards}>
      {buildWrappedHighlights(wrapped).map((highlight) => (
        <div key={highlight.label} className={styles.card} data-linked={highlight.to !== undefined}>
          <span className={styles.icon} aria-hidden="true">
            {highlight.icon}
          </span>
          <dd className={styles.value}>
            {highlight.to ? <Link to={highlight.to}>{highlight.value}</Link> : highlight.value}
          </dd>
          <dt className={styles.label}>{highlight.label}</dt>
        </div>
      ))}
    </dl>
  );
}
