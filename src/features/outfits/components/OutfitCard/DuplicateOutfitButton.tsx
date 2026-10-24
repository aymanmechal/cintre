import { useOutfits } from '../../context/useOutfits';
import type { Outfit } from '../../types/outfit';
import { createOutfitCopy, createOutfitId } from '../../utils/outfits';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';

interface DuplicateOutfitButtonProps {
  outfit: Outfit;
}

export function DuplicateOutfitButton({ outfit }: DuplicateOutfitButtonProps) {
  const { createOutfit } = useOutfits();

  return (
    <Button
      variant={ButtonVariant.Ghost}
      aria-label={`Dupliquer la tenue ${outfit.name}`}
      onClick={() => createOutfit(createOutfitCopy(outfit, createOutfitId()))}
    >
      Dupliquer
    </Button>
  );
}
