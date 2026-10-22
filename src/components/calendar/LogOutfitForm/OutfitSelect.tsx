import { useOutfits } from '../../../contexts/outfits/useOutfits';
import { SelectField } from '../../ui/Form/SelectField';
import { FieldLayout } from '../../ui/Form/fieldLayout';

interface OutfitSelectProps {
  value: string;
  onChange: (outfitId: string) => void;
}

export function OutfitSelect({ value, onChange }: OutfitSelectProps) {
  const { outfits } = useOutfits();
  const options = outfits.map((outfit) => ({ value: outfit.id, label: outfit.name }));

  return (
    <SelectField
      id="worn-outfit"
      label="Tenue portée"
      value={value}
      options={options}
      layout={FieldLayout.Stacked}
      onChange={onChange}
    />
  );
}
