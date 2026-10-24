import type { ReactNode } from 'react';
import styles from './BackupCard.module.css';

interface BackupCardProps {
  title: string;
  message: string;
  children: ReactNode;
}

export function BackupCard({ title, message, children }: BackupCardProps) {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {children}
    </article>
  );
}
