import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'action' | 'text';

export function buildButtonClassName(variant: ButtonVariant, extraClassName?: string): string {
  return [styles.button, styles[variant], extraClassName].filter(Boolean).join(' ');
}
