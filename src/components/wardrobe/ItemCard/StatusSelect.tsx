import { OWNERSHIP_STATUS_OPTIONS } from '../../../constants/selectOptions';
import { useWardrobe } from '../../../contexts/wardrobe/useWardrobe';
import type { WardrobeItem } from '../../../types/wardrobe';
import { toOwnershipStatus } from '../../../utils/wardrobe';
import { SelectField } from '../../ui/Form/SelectField';

interface StatusSelectProps {
  item: WardrobeItem;
}

export function StatusSelect({ item }: StatusSelectProps) {
  const { savePiece } = useWardrobe();

  return (
    <SelectField
      id={`wardrobe-status-${item.piece.id}`}
      label="Statut"
      value={item.status}
      options={OWNERSHIP_STATUS_OPTIONS}
      onChange={(value) => savePiece(item.piece, toOwnershipStatus(value))}
    />
  );
}
