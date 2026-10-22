import { STORAGE_LOCATION_OPTIONS } from '../../../constants/selectOptions';
import { useWardrobe } from '../../../contexts/wardrobe/useWardrobe';
import type { WardrobeItem } from '../../../types/wardrobe';
import { toStorageLocation } from '../../../utils/wardrobe';
import { SelectField } from '../../ui/Form/SelectField';

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
      options={STORAGE_LOCATION_OPTIONS}
      onChange={(value) => changeLocation(item.piece.id, toStorageLocation(value))}
    />
  );
}
