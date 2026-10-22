import type { OwnershipStatus } from '../../../constants/wardrobe';
import {
  GROUPINGS_BY_STATUS,
  WARDROBE_GROUPING_LABELS,
  type WardrobeGrouping,
} from '../../../constants/wardrobeView';
import { toWardrobeGrouping } from '../../../utils/wardrobeView';
import { SelectField } from '../../ui/Form/SelectField';

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
      onChange={(selectedValue) => onChange(toWardrobeGrouping(selectedValue))}
    />
  );
}
