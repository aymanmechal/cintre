import { NavLink } from 'react-router';
import { ROUTES } from '../../routes';
import styles from './MainNav.module.css';

const NAV_LINKS = [
  { to: ROUTES.catalog, label: 'Catalogue' },
  { to: ROUTES.wardrobe, label: 'Ma garde-robe' },
] as const;

/** NavLink ajoute aria-current="page" au lien actif : on s'en sert aussi pour le style. */
export function MainNav() {
  return (
    <nav aria-label="Navigation principale">
      <ul className={styles.list}>
        {NAV_LINKS.map((link) => (
          <li key={link.to}>
            <NavLink className={styles.link} to={link.to}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
