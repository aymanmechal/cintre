import { useWardrobe } from '../../../contexts/wardrobe/useWardrobe';
import { Button } from '../../ui/Button/Button';
import { ButtonVariant } from '../../ui/Button/buttonVariant';

interface RemoveFromWardrobeButtonProps {
  pieceId: number;
  pieceTitle: string;
}

export function RemoveFromWardrobeButton({ pieceId, pieceTitle }: RemoveFromWardrobeButtonProps) {
  const { removePiece } = useWardrobe();

  return (
    <Button
      variant={ButtonVariant.Text}
      aria-label={`Retirer ${pieceTitle} de ma garde-robe`}
      onClick={() => removePiece(pieceId)}
    >
      Retirer
    </Button>
  );
}
