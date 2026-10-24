import { WEATHER_ERROR_MESSAGES, WeatherError } from '../../constants/weather';
import { useTodayForecast } from '../../hooks/useTodayForecast';
import { useWeatherPlace } from '../../hooks/useWeatherPlace';
import { WeatherIdea } from '../WeatherIdea/WeatherIdea';
import { WeatherPlaceForm } from '../WeatherPlaceForm/WeatherPlaceForm';
import { WeatherReport } from '../WeatherReport/WeatherReport';
import { useWardrobe } from '../../../wardrobe/context/useWardrobe';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import styles from './WeatherOutfit.module.css';

export function WeatherOutfit() {
  const { items } = useWardrobe();
  const { place, error, isSearching, locate, searchCity, forgetPlace } = useWeatherPlace();
  const { weather, isLoading, hasFailed } = useTodayForecast(place);

  if (items.length === 0) return null;

  return (
    <section className={styles.card} aria-labelledby="weather-outfit-title">
      <h2 id="weather-outfit-title" className={styles.title}>
        La tenue météo
      </h2>
      {place === null && (
        <WeatherPlaceForm isSearching={isSearching} onLocate={locate} onSearch={searchCity} />
      )}
      {error !== null && <p className={styles.error}>{WEATHER_ERROR_MESSAGES[error]}</p>}
      {isLoading && place !== null && (
        <p className={styles.message} aria-live="polite">
          Je regarde le ciel à {place.name}…
        </p>
      )}
      {hasFailed && (
        <p className={styles.error}>{WEATHER_ERROR_MESSAGES[WeatherError.ForecastUnavailable]}</p>
      )}
      {place !== null && weather !== null && (
        <>
          <WeatherReport place={place} weather={weather} />
          <WeatherIdea weather={weather} />
        </>
      )}
      {place !== null && (
        <Button variant={ButtonVariant.Ghost} className={styles.change} onClick={forgetPlace}>
          Changer de lieu
        </Button>
      )}
    </section>
  );
}
