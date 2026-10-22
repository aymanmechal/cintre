import { Link } from 'react-router';
import styles from './IconButton.module.css';

interface IconLinkProps {
  icon: string;
  label: string;
  to: string;
}

export function IconLink({ icon, label, to }: IconLinkProps) {
  return (
    <Link
      className={`${styles.iconButton} ${styles.neutral}`}
      to={to}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{icon}</span>
    </Link>
  );
}
