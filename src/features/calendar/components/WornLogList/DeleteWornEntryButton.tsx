import { useWornLog } from '../../context/useWornLog';
import { IconButton } from '../../../../shared/ui/IconButton/IconButton';

const DELETE_ICON = '×';

interface DeleteWornEntryButtonProps {
  entryId: string;
  dateLabel: string;
}

export function DeleteWornEntryButton({ entryId, dateLabel }: DeleteWornEntryButtonProps) {
  const { deleteEntry } = useWornLog();

  return (
    <IconButton
      icon={DELETE_ICON}
      label={`Supprimer l'entrée du ${dateLabel}`}
      onClick={() => deleteEntry(entryId)}
    />
  );
}
