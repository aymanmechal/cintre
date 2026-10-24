import { SubmitStatus } from '../../constants/pieceForm';
import type { Piece } from '../../../../shared/pieces/types/piece';
import type { PieceFormLabels } from '../../types/pieceForm';
import { SaveErrorCard } from './SaveErrorCard';
import { SaveSuccessCard } from './SaveSuccessCard';

interface SaveResultProps {
  submitStatus: SubmitStatus;
  labels: PieceFormLabels;
  savedPiece: Piece | null;
}

export function SaveResult({ submitStatus, labels, savedPiece }: SaveResultProps) {
  if (submitStatus === SubmitStatus.Success && savedPiece) {
    return <SaveSuccessCard title={labels.success} piece={savedPiece} />;
  }

  if (submitStatus === SubmitStatus.Error) {
    return <SaveErrorCard message={labels.error} />;
  }

  return null;
}
