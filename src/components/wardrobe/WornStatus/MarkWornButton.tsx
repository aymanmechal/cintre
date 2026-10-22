import { useWardrobe } from '../../../contexts/wardrobe/useWardrobe';
import { Button, ButtonVariant } from '../../ui/Button/Button';

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
