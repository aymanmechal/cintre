import { useState } from 'react';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { FieldLayout } from '../../../../shared/ui/Form/fieldLayout';
import { SelectField } from '../../../../shared/ui/Form/SelectField';
import { TextField } from '../../../../shared/ui/Form/TextField';
import { AVAILABILITY_OPTIONS } from '../../constants/selectOptions';
import type { WardrobeSelection } from '../../hooks/useWardrobeSelection';
import { formatSelectionCount } from '../../utils/bulkEdit';
import { toAvailability } from '../../utils/wardrobe';
import styles from './SelectionBar.module.css';

const CHOOSE_AVAILABILITY = '';
const AVAILABILITY_CHOICES = [
  { value: CHOOSE_AVAILABILITY, label: 'Choisir…' },
  ...AVAILABILITY_OPTIONS,
];

interface SelectionBarProps {
  selection: WardrobeSelection;
}

export function SelectionBar({ selection }: SelectionBarProps) {
  const [tagsText, setTagsText] = useState('');

  if (!selection.isSelecting) return null;

  function addTags() {
    selection.applyTags(tagsText);
    setTagsText('');
  }

  return (
    <section className={styles.bar} aria-label="Actions sur la sélection">
      <div className={styles.summary}>
        <p className={styles.count} aria-live="polite">
          {formatSelectionCount(selection.selectedCount)}
        </p>
        <Button variant={ButtonVariant.Ghost} onClick={selection.selectAll}>
          Tout sélectionner
        </Button>
        <Button variant={ButtonVariant.Ghost} onClick={selection.clearSelection}>
          Tout désélectionner
        </Button>
      </div>
      {selection.selectedCount > 0 && (
        <div className={styles.actions}>
          <Button variant={ButtonVariant.Action} onClick={selection.applyFavorite}>
            {selection.allAreFavorites ? 'Retirer des favoris' : 'Mettre en favoris'}
          </Button>
          <SelectField
            id="selection-availability"
            label="Disponibilité"
            layout={FieldLayout.Stacked}
            value={CHOOSE_AVAILABILITY}
            options={AVAILABILITY_CHOICES}
            onChange={(value) => {
              if (value !== CHOOSE_AVAILABILITY) selection.applyAvailability(toAvailability(value));
            }}
          />
          <TextField
            id="selection-tags"
            label="Ajouter des tags"
            placeholder="Ex. soirée, vacances"
            value={tagsText}
            onChange={setTagsText}
          />
          <Button onClick={addTags}>Ajouter les tags</Button>
        </div>
      )}
    </section>
  );
}
