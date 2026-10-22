import { Link, type LinkProps } from 'react-router';
import { ButtonVariant } from './Button';
import styles from './Button.module.css';

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
}

export function ButtonLink({
  variant = ButtonVariant.Primary,
  className,
  ...props
}: ButtonLinkProps) {
  const classNames = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  return <Link className={classNames} {...props} />;
}
