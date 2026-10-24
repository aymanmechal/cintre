import type { WeatherSummary, WeatherPlace } from '../../types/weather';
import {
  buildWeatherTips,
  formatRainChance,
  formatTemperatureRange,
  formatWeatherFeel,
} from '../../utils/weatherMessages';
import styles from './WeatherReport.module.css';

interface WeatherReportProps {
  place: WeatherPlace;
  weather: WeatherSummary;
}

export function WeatherReport({ place, weather }: WeatherReportProps) {
  return (
    <div className={styles.report} aria-label={`Météo à ${place.name}`}>
      <p className={styles.headline}>
        {formatWeatherFeel(weather)} à {place.name}
      </p>
      <ul className={styles.facts}>
        <li className={styles.fact}>{formatTemperatureRange(weather)}</li>
        <li className={styles.fact}>{formatRainChance(weather)}</li>
      </ul>
      <ul className={styles.tips}>
        {buildWeatherTips(weather).map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
