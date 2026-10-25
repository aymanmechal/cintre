import { PIECE_TYPE_OPTIONS } from '../../../../shared/pieces/constants/pieceTypeOptions';
import {
  ALL_PIECE_TYPES,
  type PieceTypeFilter,
} from '../../../../shared/pieces/constants/categories';
import { toPieceTypeFilter } from '../../../../shared/pieces/utils/categories';
import { SelectField } from '../../../../shared/ui/Form/SelectField';
import { FieldLayout } from '../../../../shared/ui/Form/fieldLayout';
import type { SelectOption } from '../../../../shared/ui/Form/selectOption';

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
      layout={FieldLayout.Stacked}
      onChange={(selectedValue) => onChange(toPieceTypeFilter(selectedValue))}
    />
  );
}
