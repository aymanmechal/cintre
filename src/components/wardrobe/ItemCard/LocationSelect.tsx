import { STORAGE_LOCATION_LABELS, STORAGE_LOCATIONS } from '../../../constants/wardrobe';
import { useWardrobe } from '../../../contexts/wardrobe/useWardrobe';
import type { WardrobeItem } from '../../../types/wardrobe';
import { toStorageLocation } from '../../../utils/wardrobe';
import { SelectField } from '../../ui/Form/SelectField';
import type { SelectOption } from '../../ui/Form/selectOption';

const LOCATION_OPTIONS: readonly SelectOption[] = STORAGE_LOCATIONS.map((location) => ({
  value: location,
  label: STORAGE_LOCATION_LABELS[location],
}));

interface LocationSelectProps {
  item: WardrobeItem;
}

export function LocationSelect({ item }: LocationSelectProps) {
  const { changeLocation } = useWardrobe();

  return (
    <SelectField
      id={`wardrobe-location-${item.piece.id}`}
      label="Rangée"
      value={item.location}
      options={LOCATION_OPTIONS}
      onChange={(value) => changeLocation(item.piece.id, toStorageLocation(value))}
    />
  );
}
