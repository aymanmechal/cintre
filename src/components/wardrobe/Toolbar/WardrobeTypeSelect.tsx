import { PIECE_TYPE_OPTIONS } from '../../../constants/selectOptions';
import {
  ALL_PIECE_TYPES,
  type PieceTypeFilter,
} from '../../../contexts/catalogFilters/catalogFiltersReducer';
import { toPieceTypeFilter } from '../../../utils/categories';
import { SelectField } from '../../ui/Form/SelectField';
import type { SelectOption } from '../../ui/Form/selectOption';

const TYPE_FILTER_OPTIONS: readonly SelectOption[] = [
  { value: ALL_PIECE_TYPES, label: 'Tous les types' },
  ...PIECE_TYPE_OPTIONS,
];

interface WardrobeTypeSelectProps {
  value: PieceTypeFilter;
  onChange: (pieceType: PieceTypeFilter) => void;
}

export function WardrobeTypeSelect({ value, onChange }: WardrobeTypeSelectProps) {
  return (
    <SelectField
      id="wardrobe-piece-type"
      label="Type"
      value={value}
      options={TYPE_FILTER_OPTIONS}
      onChange={(selectedValue) => onChange(toPieceTypeFilter(selectedValue))}
    />
  );
}
