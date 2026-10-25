import type { OwnershipStatus } from '../../constants/wardrobe';
import {
  GROUPINGS_BY_STATUS,
  WARDROBE_GROUPING_LABELS,
  type WardrobeGrouping,
} from '../../constants/wardrobeView';
import { toWardrobeGrouping } from '../../utils/wardrobeView';
import { SelectField } from '../../../../shared/ui/Form/SelectField';
import { FieldLayout } from '../../../../shared/ui/Form/fieldLayout';

interface WardrobeGroupingSelectProps {
  status: OwnershipStatus;
  value: WardrobeGrouping;
  onChange: (grouping: WardrobeGrouping) => void;
}

export function WardrobeGroupingSelect({ status, value, onChange }: WardrobeGroupingSelectProps) {
  const options = GROUPINGS_BY_STATUS[status].map((grouping) => ({
    value: grouping,
    label: WARDROBE_GROUPING_LABELS[grouping],
  }));

  return (
    <SelectField
      id="wardrobe-grouping"
      label="Ranger"
      value={value}
      options={options}
      layout={FieldLayout.Stacked}
      onChange={(selectedValue) => onChange(toWardrobeGrouping(selectedValue))}
    />
  );
}
