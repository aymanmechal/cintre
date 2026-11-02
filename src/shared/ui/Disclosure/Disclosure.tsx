import type { ReactNode } from 'react';
import styles from './Disclosure.module.css';

interface DisclosureProps {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
  defaultOpen?: boolean;
}

export function Disclosure({
  summary,
  children,
  className,
  labelClassName,
  defaultOpen,
}: DisclosureProps) {
  const classNames = className ? `${styles.details} ${className}` : styles.details;
  return (
    <details className={classNames} open={defaultOpen}>
      <summary className={styles.summary}>
        <span className={labelClassName}>{summary}</span>
        <span className={styles.chevron} aria-hidden="true" />
      </summary>
      {children}
    </details>
  );
}
