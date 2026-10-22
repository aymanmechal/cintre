import type { ButtonHTMLAttributes } from 'react';
import { buildButtonClassName, type ButtonVariant } from './buttonClassName';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return <button type={type} className={buildButtonClassName(variant, className)} {...props} />;
}
