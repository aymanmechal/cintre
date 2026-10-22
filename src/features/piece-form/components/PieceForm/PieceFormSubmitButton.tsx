import type { PieceFormLabels } from '../../types/pieceForm';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';

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
