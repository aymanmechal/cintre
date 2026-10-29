import type { Occasion } from '../../../constants/occasions';
import { FieldLayout } from '../../../../../shared/ui/Form/fieldLayout';
import { SelectField } from '../../../../../shared/ui/Form/SelectField';
import { NO_OCCASION, OCCASION_OPTIONS } from '../../../constants/occasions';
import { toOccasion } from '../../../utils/occasions';
import styles from './OutfitMoreOptions.module.css';

interface OutfitMoreOptionsProps {
  occasion: Occasion | null;
  onChangeOccasion: (occasion: Occasion | null) => void;
}

export function OutfitMoreOptions({ occasion, onChangeOccasion }: OutfitMoreOptionsProps) {
  return (
    <details className={styles.options}>
      <summary className={styles.summary}>Plus d’options</summary>
      <SelectField
        id="outfit-occasion"
        label="Occasion (facultatif)"
        layout={FieldLayout.Stacked}
        value={occasion ?? NO_OCCASION}
        options={OCCASION_OPTIONS}
        onChange={(value) => onChangeOccasion(toOccasion(value))}
      />
    </details>
  );
}
