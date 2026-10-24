import { ROUTES } from '../../../shared/routes';
import { NavItem } from './NavItem';
import styles from './MainNav.module.css';

const NAV_ITEMS = [
  { to: ROUTES.catalog, label: 'Catalogue' },
  { to: ROUTES.wardrobe, label: 'Ma garde-robe' },
  { to: ROUTES.outfits, label: 'Mes tenues' },
  { to: ROUTES.calendar, label: 'Calendrier' },
  { to: ROUTES.suitcase, label: 'Valise' },
] as const;

export function MainNav() {
  return (
    <nav className={styles.nav} aria-label="Navigation principale">
      <ul className={styles.navList}>
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavItem to={item.to} label={item.label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
