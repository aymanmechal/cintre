import { useState, type FormEvent } from 'react';
import { DEFAULT_TRIP_DAYS, TRIP_ERROR_MESSAGES, TripError } from '../../constants/suitcase';
import type { TripForm } from '../../types/suitcase';
import { toIsoDate } from '../../../wardrobe/utils/wornDates';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { TextField } from '../../../../shared/ui/Form/TextField';
import { TextFieldType } from '../../../../shared/ui/Form/textFieldType';
import styles from './TripFormCard.module.css';

interface TripFormCardProps {
  error: TripError | null;
  isSearching: boolean;
  onSubmit: (form: TripForm) => void;
}

export function TripFormCard({ error, isSearching, onSubmit }: TripFormCardProps) {
  const [form, setForm] = useState<TripForm>(() => ({
    city: '',
    startDate: toIsoDate(new Date()),
    dayCount: DEFAULT_TRIP_DAYS,
  }));
  const updateField = (field: keyof TripForm) => (value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <form className={styles.card} aria-label="Préparer une valise" onSubmit={submit}>
      <TextField
        id="trip-city"
        label="Destination"
        placeholder="Ex. Barcelone"
        value={form.city}
        onChange={updateField('city')}
      />
      <div className={styles.row}>
        <TextField
          id="trip-start"
          label="Départ"
          type={TextFieldType.Date}
          value={form.startDate}
          onChange={updateField('startDate')}
        />
        <TextField
          id="trip-days"
          label="Nombre de jours"
          type={TextFieldType.Number}
          value={form.dayCount}
          onChange={updateField('dayCount')}
        />
      </div>
      {error !== null && (
        <p className={styles.error} role="alert">
          {TRIP_ERROR_MESSAGES[error]}
        </p>
      )}
      <Button type="submit" variant={ButtonVariant.Action} disabled={isSearching}>
        🧳 Préparer ma valise
      </Button>
    </form>
  );
}
