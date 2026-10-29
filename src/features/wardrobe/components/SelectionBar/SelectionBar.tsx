import { useState } from 'react';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { FieldLayout } from '../../../../shared/ui/Form/fieldLayout';
import { SelectField } from '../../../../shared/ui/Form/SelectField';
import { TextField } from '../../../../shared/ui/Form/TextField';
import { AVAILABILITY_OPTIONS, OWNERSHIP_STATUS_OPTIONS } from '../../constants/selectOptions';
import type { WardrobeSelection } from '../../hooks/useWardrobeSelection';
import { formatSelectionCount } from '../../utils/bulkEdit';
import { toAvailability, toOwnershipStatus } from '../../utils/wardrobe';
import styles from './SelectionBar.module.css';

const NO_CHOICE = '';
const CHOOSE_OPTION = { value: NO_CHOICE, label: 'Choisir…' };
const AVAILABILITY_CHOICES = [CHOOSE_OPTION, ...AVAILABILITY_OPTIONS];
const STATUS_CHOICES = [CHOOSE_OPTION, ...OWNERSHIP_STATUS_OPTIONS];

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
            value={NO_CHOICE}
            options={AVAILABILITY_CHOICES}
            onChange={(value) => {
              if (value !== NO_CHOICE) selection.applyAvailability(toAvailability(value));
            }}
          />
          <SelectField
            id="selection-status"
            label="Statut"
            layout={FieldLayout.Stacked}
            value={NO_CHOICE}
            options={STATUS_CHOICES}
            onChange={(value) => {
              if (value !== NO_CHOICE) selection.applyStatus(toOwnershipStatus(value));
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
