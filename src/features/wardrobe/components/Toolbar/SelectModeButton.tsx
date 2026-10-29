import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';

interface SelectModeButtonProps {
  isSelecting: boolean;
  onToggle: () => void;
}

export function SelectModeButton({ isSelecting, onToggle }: SelectModeButtonProps) {
  return (
    <Button
      variant={isSelecting ? ButtonVariant.Action : ButtonVariant.Ghost}
      aria-pressed={isSelecting}
      onClick={onToggle}
    >
      {isSelecting ? 'Terminer' : 'Sélectionner'}
    </Button>
  );
}
