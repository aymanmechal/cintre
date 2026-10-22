import type { PieceFormLabels } from '../../../types/pieceForm';
import { Button } from '../../ui/Button/Button';
import { ButtonVariant } from '../../ui/Button/buttonVariant';

interface PieceFormSubmitButtonProps {
  isSubmitting: boolean;
  labels: PieceFormLabels;
}

export function PieceFormSubmitButton({ isSubmitting, labels }: PieceFormSubmitButtonProps) {
  return (
    <Button type="submit" variant={ButtonVariant.Action} disabled={isSubmitting}>
      {isSubmitting ? labels.submitting : labels.submit}
    </Button>
  );
}
