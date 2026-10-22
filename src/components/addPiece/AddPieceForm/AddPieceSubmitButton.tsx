import { Button } from '../../ui/Button/Button';
import { ButtonVariant } from '../../ui/Button/buttonVariant';

interface AddPieceSubmitButtonProps {
  isSubmitting: boolean;
}

export function AddPieceSubmitButton({ isSubmitting }: AddPieceSubmitButtonProps) {
  return (
    <Button type="submit" variant={ButtonVariant.Action} disabled={isSubmitting}>
      {isSubmitting ? 'Ajout en cours…' : 'Ajouter la pièce'}
    </Button>
  );
}
