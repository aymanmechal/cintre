import { PIECE_TYPE_OPTIONS } from '../../../../shared/pieces/constants/pieceTypeOptions';
import { ALL_PIECE_TYPES } from '../../../../shared/pieces/constants/categories';
import { useCatalogFilters } from '../../context/useCatalogFilters';
import { toPieceTypeFilter } from '../../../../shared/pieces/utils/categories';
import { SelectField } from '../../../../shared/ui/Form/SelectField';
import type { SelectOption } from '../../../../shared/ui/Form/selectOption';

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
