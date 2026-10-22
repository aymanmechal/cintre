import { useWardrobe } from '../../context/useWardrobe';
import { IconButton } from '../../../../shared/ui/IconButton/IconButton';

const REMOVE_ICON = '✕';

interface RemoveFromWardrobeButtonProps {
  pieceId: number;
  pieceTitle: string;
}

export function RemoveFromWardrobeButton({ pieceId, pieceTitle }: RemoveFromWardrobeButtonProps) {
  const { removePiece } = useWardrobe();

  return (
    <IconButton
      icon={REMOVE_ICON}
      label={`Retirer ${pieceTitle} de ma garde-robe`}
      onClick={() => removePiece(pieceId)}
    />
  );
}
