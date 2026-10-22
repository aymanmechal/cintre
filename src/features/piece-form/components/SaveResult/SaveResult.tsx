import { SubmitStatus } from '../../constants/pieceForm';
import type { PieceFormLabels, SavedPiece } from '../../types/pieceForm';
import { SaveErrorCard } from './SaveErrorCard';
import { SaveSuccessCard } from './SaveSuccessCard';

interface SaveResultProps {
  submitStatus: SubmitStatus;
  labels: PieceFormLabels;
  savedPiece: SavedPiece | null;
}

export function SaveResult({ submitStatus, labels, savedPiece }: SaveResultProps) {
  if (submitStatus === SubmitStatus.Success && savedPiece) {
    return <SaveSuccessCard title={labels.success} savedPiece={savedPiece} />;
  }

  if (submitStatus === SubmitStatus.Error) {
    return <SaveErrorCard message={labels.error} />;
  }

  return null;
}
