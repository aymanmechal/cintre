import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export enum ButtonVariant {
  Primary = 'primary',
  Action = 'action',
  Ghost = 'ghost',
  Danger = 'danger',
}

export function Button({
  variant = ButtonVariant.Primary,
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  const classNames = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  return <button type={type} className={classNames} {...props} />;
}
