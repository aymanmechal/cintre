import { SubmitStatus } from '../../../constants/pieceForm';
import type { PieceFormLabels, SavedPiece } from '../../../types/pieceForm';
import { FeedbackTone } from '../../ui/FormFeedback/feedbackTone';
import { FormFeedback } from '../../ui/FormFeedback/FormFeedback';
import { SavedPieceSummary } from './SavedPieceSummary';

interface PieceFormFeedbackProps {
  submitStatus: SubmitStatus;
  labels: PieceFormLabels;
  savedPiece: SavedPiece | null;
}

export function PieceFormFeedback({ submitStatus, labels, savedPiece }: PieceFormFeedbackProps) {
  if (submitStatus === SubmitStatus.Success && savedPiece) {
    return (
      <FormFeedback tone={FeedbackTone.Success}>
        <SavedPieceSummary title={labels.success} savedPiece={savedPiece} />
      </FormFeedback>
    );
  }

  if (submitStatus === SubmitStatus.Error) {
    return <FormFeedback tone={FeedbackTone.Error}>{labels.error}</FormFeedback>;
  }

  return null;
}
