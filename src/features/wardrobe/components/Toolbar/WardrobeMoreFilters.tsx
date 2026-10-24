import { PIECE_COLOR_OPTIONS } from '../../../../shared/pieces/constants/colorOptions';
import { SEASON_OPTIONS } from '../../../../shared/pieces/constants/seasonOptions';
import { toPieceColor } from '../../../../shared/pieces/utils/colors';
import { toSeason } from '../../../../shared/pieces/utils/seasons';
import { CheckboxField } from '../../../../shared/ui/Form/CheckboxField';
import { SelectField } from '../../../../shared/ui/Form/SelectField';
import type { SelectOption } from '../../../../shared/ui/Form/selectOption';
import type { WardrobeViewState } from '../../hooks/useWardrobeView';
import styles from './WardrobeMoreFilters.module.css';

const ALL = '';

const COLOR_FILTER_OPTIONS: readonly SelectOption[] = [
  { value: ALL, label: 'Toutes les couleurs' },
  ...PIECE_COLOR_OPTIONS,
];

const SEASON_FILTER_OPTIONS: readonly SelectOption[] = [
  { value: ALL, label: 'Toutes les saisons' },
  ...SEASON_OPTIONS.filter((option) => option.value !== ALL),
];

interface WardrobeMoreFiltersProps {
  viewState: WardrobeViewState;
}

export function WardrobeMoreFilters({ viewState }: WardrobeMoreFiltersProps) {
  const { view, tags } = viewState;
  const tagOptions: SelectOption[] = [
    { value: ALL, label: 'Tous les tags' },
    ...tags.map((tag) => ({ value: tag, label: `#${tag}` })),
  ];

  return (
    <details className={styles.details}>
      <summary className={styles.summary}>Plus de filtres</summary>
      <div className={styles.fields}>
        <SelectField
          id="wardrobe-color"
          label="Couleur"
          value={view.color ?? ALL}
          options={COLOR_FILTER_OPTIONS}
          onChange={(value) => viewState.changeColor(toPieceColor(value))}
        />
        <SelectField
          id="wardrobe-season"
          label="Saison"
          value={view.season ?? ALL}
          options={SEASON_FILTER_OPTIONS}
          onChange={(value) => viewState.changeSeason(toSeason(value))}
        />
        {tags.length > 0 && (
          <SelectField
            id="wardrobe-tag"
            label="Tag"
            value={view.tag ?? ALL}
            options={tagOptions}
            onChange={(value) => viewState.changeTag(value === ALL ? null : value)}
          />
        )}
        <CheckboxField
          id="wardrobe-only-favorites"
          label="Mes favoris seulement"
          isChecked={view.onlyFavorites}
          onChange={viewState.toggleOnlyFavorites}
        />
        <CheckboxField
          id="wardrobe-only-available"
          label="Disponibles seulement"
          isChecked={view.onlyAvailable}
          onChange={viewState.toggleOnlyAvailable}
        />
      </div>
    </details>
  );
}
