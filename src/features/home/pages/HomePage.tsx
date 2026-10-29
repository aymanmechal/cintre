import { DemoModeCard } from '../../demo/components/DemoModeCard/DemoModeCard';
import { CandyMarquee } from '../components/CandyMarquee/CandyMarquee';
import { ForgottenSpotlight } from '../components/ForgottenSpotlight/ForgottenSpotlight';
import { HomeHero } from '../components/HomeHero/HomeHero';
import { HomeStats } from '../components/HomeStats/HomeStats';
import { WeatherOutfit } from '../../weather/components/WeatherOutfit/WeatherOutfit';
import { formatPageTitle } from '../../../shared/utils/format';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.page}>
      <title>{formatPageTitle('Accueil')}</title>
      <HomeHero />
      <DemoModeCard />
      <WeatherOutfit />
      <CandyMarquee />
      <HomeStats />
      <ForgottenSpotlight />
    </div>
  );
}
