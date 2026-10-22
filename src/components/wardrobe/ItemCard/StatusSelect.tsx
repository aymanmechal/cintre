import { OWNERSHIP_STATUS_LABELS, OWNERSHIP_STATUSES } from '../../../constants/wardrobe';
import { useWardrobe } from '../../../contexts/wardrobe/useWardrobe';
import type { WardrobeItem } from '../../../types/wardrobe';
import { toOwnershipStatus } from '../../../utils/wardrobe';
import { SelectField } from '../../ui/Form/SelectField';
import type { SelectOption } from '../../ui/Form/selectOption';

const STATUS_OPTIONS: readonly SelectOption[] = OWNERSHIP_STATUSES.map((status) => ({
  value: status,
  label: OWNERSHIP_STATUS_LABELS[status],
}));

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
      options={STATUS_OPTIONS}
      onChange={(value) => savePiece(item.piece, toOwnershipStatus(value))}
    />
  );
}
