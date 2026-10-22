import { useWardrobe } from '../../../contexts/wardrobe/useWardrobe';
import { Button } from '../../ui/Button/Button';
import { ButtonVariant } from '../../ui/Button/buttonVariant';

interface MarkWornButtonProps {
  pieceId: number;
}

export function MarkWornButton({ pieceId }: MarkWornButtonProps) {
  const { markWorn } = useWardrobe();

  return (
    <Button variant={ButtonVariant.Ghost} onClick={() => markWorn(pieceId)}>
      Portée aujourd'hui
    </Button>
  );
}
