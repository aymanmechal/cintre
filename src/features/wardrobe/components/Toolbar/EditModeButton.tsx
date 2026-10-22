import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';

interface EditModeButtonProps {
  isEditing: boolean;
  onToggle: () => void;
}

export function EditModeButton({ isEditing, onToggle }: EditModeButtonProps) {
  return (
    <Button
      variant={isEditing ? ButtonVariant.Action : ButtonVariant.Ghost}
      aria-pressed={isEditing}
      onClick={onToggle}
    >
      {isEditing ? 'Terminer' : 'Modifier'}
    </Button>
  );
}
