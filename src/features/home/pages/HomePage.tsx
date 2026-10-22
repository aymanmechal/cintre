import { CandyMarquee } from '../components/CandyMarquee/CandyMarquee';
import { ForgottenSpotlight } from '../components/ForgottenSpotlight/ForgottenSpotlight';
import { HomeHero } from '../components/HomeHero/HomeHero';
import { HomeStats } from '../components/HomeStats/HomeStats';
import { formatPageTitle } from '../../../shared/utils/format';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.page}>
      <title>{formatPageTitle('Accueil')}</title>
      <HomeHero />
      <CandyMarquee />
      <HomeStats />
      <ForgottenSpotlight />
    </div>
  );
}
