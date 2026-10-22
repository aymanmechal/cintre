import type { ReactNode } from 'react';
import styles from './FormSection.module.css';

interface FormSectionProps {
  legend: string;
  children: ReactNode;
}

export function FormSection({ legend, children }: FormSectionProps) {
  return (
    <fieldset className={styles.section}>
      <legend className={styles.legend}>{legend}</legend>
      {children}
    </fieldset>
  );
}
