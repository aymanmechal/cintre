import { CandyMarquee } from '../components/home/CandyMarquee/CandyMarquee';
import { ForgottenSpotlight } from '../components/home/ForgottenSpotlight/ForgottenSpotlight';
import { HomeHero } from '../components/home/HomeHero/HomeHero';
import { HomeStats } from '../components/home/HomeStats/HomeStats';
import { formatPageTitle } from '../utils/format';
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
