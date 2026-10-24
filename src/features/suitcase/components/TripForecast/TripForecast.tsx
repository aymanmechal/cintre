import { FORECAST_FAILED_MESSAGE, NO_FORECAST_YET_MESSAGE } from '../../constants/suitcase';
import type { SuitcasePlanState } from '../../hooks/useSuitcasePlan';
import type { Trip } from '../../types/suitcase';
import { WeatherReport } from '../../../weather/components/WeatherReport/WeatherReport';
import styles from './TripForecast.module.css';

interface TripForecastProps {
  trip: Trip;
  forecast: SuitcasePlanState;
}

export function TripForecast({ trip, forecast }: TripForecastProps) {
  if (forecast.isTooFarAhead) return <p className={styles.message}>{NO_FORECAST_YET_MESSAGE}</p>;
  if (forecast.hasFailed) return <p className={styles.message}>{FORECAST_FAILED_MESSAGE}</p>;
  if (forecast.weather === null) {
    return (
      <p className={styles.message} aria-live="polite">
        Je regarde le ciel à {trip.place.name}…
      </p>
    );
  }
  return <WeatherReport place={trip.place} weather={forecast.weather} />;
}
