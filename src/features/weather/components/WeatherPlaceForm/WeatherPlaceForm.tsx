import { useState, type FormEvent } from 'react';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { TextField } from '../../../../shared/ui/Form/TextField';
import styles from './WeatherPlaceForm.module.css';

interface WeatherPlaceFormProps {
  isSearching: boolean;
  onLocate: () => void;
  onSearch: (city: string) => void;
}

export function WeatherPlaceForm({ isSearching, onLocate, onSearch }: WeatherPlaceFormProps) {
  const [city, setCity] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(city);
  }

  return (
    <div className={styles.place}>
      <Button variant={ButtonVariant.Action} disabled={isSearching} onClick={onLocate}>
        📍 Utiliser ma position
      </Button>
      <form className={styles.form} onSubmit={submit}>
        <TextField
          id="weather-city"
          label="Ou ta ville"
          placeholder="Ex. Lyon"
          value={city}
          onChange={setCity}
        />
        <Button type="submit" disabled={isSearching || city.trim() === ''}>
          Voir la météo
        </Button>
      </form>
    </div>
  );
}
