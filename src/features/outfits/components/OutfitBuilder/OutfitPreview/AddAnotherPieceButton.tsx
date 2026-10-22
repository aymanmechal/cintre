import { Button, ButtonVariant } from '../../../../../shared/ui/Button/Button';

interface AddAnotherPieceButtonProps {
  onClick: () => void;
}

export function AddAnotherPieceButton({ onClick }: AddAnotherPieceButtonProps) {
  return (
    <Button variant={ButtonVariant.Ghost} onClick={onClick}>
      + En ajouter un autre
    </Button>
  );
}
