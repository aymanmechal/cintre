import { Link, type LinkProps } from 'react-router';
import { buildButtonClassName, type ButtonVariant } from './buttonClassName';

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
}

export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return <Link className={buildButtonClassName(variant, className)} {...props} />;
}
