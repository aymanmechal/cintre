import { FieldLayout } from '../../../../shared/ui/Form/fieldLayout';
import { SelectField } from '../../../../shared/ui/Form/SelectField';
import { NO_OCCASION, OCCASION_OPTIONS } from '../../constants/occasions';
import { useOutfits } from '../../context/useOutfits';
import type { Outfit } from '../../types/outfit';
import { toOccasion } from '../../utils/occasions';

interface OutfitOccasionFieldProps {
  outfit: Outfit;
}

export function OutfitOccasionField({ outfit }: OutfitOccasionFieldProps) {
  const { updateOutfit } = useOutfits();

  return (
    <SelectField
      id={`occasion-${outfit.id}`}
      label={`Occasion de ${outfit.name}`}
      layout={FieldLayout.Stacked}
      value={outfit.occasion ?? NO_OCCASION}
      options={OCCASION_OPTIONS}
      onChange={(value) => updateOutfit({ ...outfit, occasion: toOccasion(value) })}
    />
  );
}
