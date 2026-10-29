import { WEATHER_ERROR_MESSAGES, WeatherError } from '../../constants/weather';
import { useTodayForecast } from '../../hooks/useTodayForecast';
import { useWeatherPlace } from '../../hooks/useWeatherPlace';
import { WeatherIdea } from '../WeatherIdea/WeatherIdea';
import { WeatherPlaceForm } from '../WeatherPlaceForm/WeatherPlaceForm';
import { WeatherReport } from '../WeatherReport/WeatherReport';
import { useWardrobe } from '../../../wardrobe/context/useWardrobe';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { useDisclosure } from '../../../../shared/hooks/useDisclosure';
import styles from './WeatherOutfit.module.css';

export function WeatherOutfit() {
  const { items } = useWardrobe();
  const { place, error, isSearching, locate, searchCity, forgetPlace } = useWeatherPlace();
  const { weather, isLoading, hasFailed } = useTodayForecast(place);
  const idea = useDisclosure();

  if (items.length === 0) return null;

  return (
    <section className={styles.banner} aria-labelledby="weather-outfit-title">
      <div className={styles.line}>
        <h2 id="weather-outfit-title" className={styles.title}>
          <span aria-hidden="true">🌤 </span>La tenue météo
        </h2>
        {place === null && (
          <WeatherPlaceForm isSearching={isSearching} onLocate={locate} onSearch={searchCity} />
        )}
        {isLoading && place !== null && (
          <p className={styles.message} aria-live="polite">
            Je regarde le ciel à {place.name}…
          </p>
        )}
        {place !== null && weather !== null && <WeatherReport place={place} weather={weather} />}
        {place !== null && (
          <div className={styles.actions}>
            {weather !== null && (
              <Button
                variant={ButtonVariant.Action}
                aria-expanded={idea.isOpen}
                onClick={idea.toggle}
              >
                {idea.isOpen ? 'Masquer la tenue' : 'Voir la tenue'}
              </Button>
            )}
            <Button variant={ButtonVariant.Ghost} onClick={forgetPlace}>
              Changer de lieu
            </Button>
          </div>
        )}
      </div>
      {error !== null && <p className={styles.error}>{WEATHER_ERROR_MESSAGES[error]}</p>}
      {hasFailed && (
        <p className={styles.error}>{WEATHER_ERROR_MESSAGES[WeatherError.ForecastUnavailable]}</p>
      )}
      {idea.isOpen && weather !== null && <WeatherIdea weather={weather} />}
    </section>
  );
}
