import { NavLink } from 'react-router';
import styles from './NavItem.module.css';

interface NavItemProps {
  to: string;
  label: string;
}

export function NavItem({ to, label }: NavItemProps) {
  return (
    <NavLink className={styles.navItem} to={to}>
      {label}
    </NavLink>
  );
}
