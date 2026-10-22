import type { ButtonHTMLAttributes } from 'react';
import { ButtonVariant } from './buttonVariant';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
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
