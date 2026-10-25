import { AppFeature } from '../../../shared/constants/features';
import { ROUTES } from '../../../shared/routes';
import { isFeatureVisible } from '../../../shared/utils/featureFlags';
import { NavItem } from './NavItem';
import styles from './MainNav.module.css';

const NAV_ITEMS = [
  { feature: AppFeature.Catalog, to: ROUTES.catalog, label: 'Catalogue' },
  { feature: AppFeature.Wardrobe, to: ROUTES.wardrobe, label: 'Ma garde-robe' },
  { feature: AppFeature.Outfits, to: ROUTES.outfits, label: 'Mes tenues' },
  { feature: AppFeature.Calendar, to: ROUTES.calendar, label: 'Calendrier' },
  { feature: AppFeature.Suitcase, to: ROUTES.suitcase, label: 'Valise' },
].filter((item) => isFeatureVisible(item.feature));

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
