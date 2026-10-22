import { IconButton } from '../../../ui/IconButton/IconButton';

const CLEAR_ICON = '×';

interface ClearSlotButtonProps {
  pieceTitle: string;
  onClear: () => void;
}

export function ClearSlotButton({ pieceTitle, onClear }: ClearSlotButtonProps) {
  return <IconButton icon={CLEAR_ICON} label={`Retirer ${pieceTitle}`} onClick={onClear} />;
}
