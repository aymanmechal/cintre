import {
  WARDROBE_SORT_ORDER_LABELS,
  WARDROBE_SORT_ORDERS,
  type WardrobeSortOrder,
} from '../../constants/wardrobeView';
import { toWardrobeSortOrder } from '../../utils/wardrobeView';
import { SelectField } from '../../../../shared/ui/Form/SelectField';
import { FieldLayout } from '../../../../shared/ui/Form/fieldLayout';
import type { SelectOption } from '../../../../shared/ui/Form/selectOption';

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
      layout={FieldLayout.Stacked}
      onChange={(selectedValue) => onChange(toWardrobeSortOrder(selectedValue))}
    />
  );
}
