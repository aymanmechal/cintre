import { PIECE_TYPE_OPTIONS } from '../../../constants/selectOptions';
import { ALL_PIECE_TYPES } from '../../../contexts/catalogFilters/catalogFiltersReducer';
import { useCatalogFilters } from '../../../contexts/catalogFilters/useCatalogFilters';
import { toPieceTypeFilter } from '../../../utils/categories';
import { SelectField } from '../../ui/Form/SelectField';
import type { SelectOption } from '../../ui/Form/selectOption';

const PIECE_TYPE_FILTER_OPTIONS: readonly SelectOption[] = [
  { value: ALL_PIECE_TYPES, label: 'Tous les types' },
  ...PIECE_TYPE_OPTIONS,
];

export function PieceTypeSelect() {
  const { filters, changePieceType } = useCatalogFilters();

  return (
    <SelectField
      id="catalog-piece-type"
      label="Type"
      value={filters.pieceType}
      options={PIECE_TYPE_FILTER_OPTIONS}
      onChange={(value) => changePieceType(toPieceTypeFilter(value))}
    />
  );
}
