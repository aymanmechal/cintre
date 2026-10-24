import { CheckboxField } from '../../../../shared/ui/Form/CheckboxField';
import type { Outfit } from '../../types/outfit';

interface CompareOutfitToggleProps {
  outfit: Outfit;
  isCompared: boolean;
  canCompare: boolean;
  onToggle: () => void;
}

export function CompareOutfitToggle({
  outfit,
  isCompared,
  canCompare,
  onToggle,
}: CompareOutfitToggleProps) {
  return (
    <CheckboxField
      id={`compare-${outfit.id}`}
      label={`Comparer ${outfit.name}`}
      isChecked={isCompared}
      isDisabled={!isCompared && !canCompare}
      onChange={onToggle}
    />
  );
}
