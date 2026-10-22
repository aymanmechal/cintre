import {
  WARDROBE_SORT_ORDER_LABELS,
  WARDROBE_SORT_ORDERS,
  type WardrobeSortOrder,
} from '../../../constants/wardrobeView';
import { toWardrobeSortOrder } from '../../../utils/wardrobeView';
import { SelectField } from '../../ui/Form/SelectField';
import type { SelectOption } from '../../ui/Form/selectOption';

const SORT_OPTIONS: readonly SelectOption[] = WARDROBE_SORT_ORDERS.map((sortOrder) => ({
  value: sortOrder,
  label: WARDROBE_SORT_ORDER_LABELS[sortOrder],
}));

interface WardrobeSortSelectProps {
  value: WardrobeSortOrder;
  onChange: (sortOrder: WardrobeSortOrder) => void;
}

export function WardrobeSortSelect({ value, onChange }: WardrobeSortSelectProps) {
  return (
    <SelectField
      id="wardrobe-sort-order"
      label="Trier"
      value={value}
      options={SORT_OPTIONS}
      onChange={(selectedValue) => onChange(toWardrobeSortOrder(selectedValue))}
    />
  );
}
