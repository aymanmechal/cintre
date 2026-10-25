import { buildMissingPiecesHint } from '../../../utils/outfits';
import { Button, ButtonVariant } from '../../../../../shared/ui/Button/Button';
import { FormFeedback } from '../../../../../shared/ui/FormFeedback/FormFeedback';
import { FeedbackTone } from '../../../../../shared/ui/FormFeedback/feedbackTone';
import styles from './OutfitSaveBar.module.css';

const HINT_ID = 'outfit-save-hint';

interface OutfitSaveBarProps {
  missingPieceCount: number;
  isDuplicate: boolean;
  hasJustSaved: boolean;
}

export function OutfitSaveBar({
  missingPieceCount,
  isDuplicate,
  hasJustSaved,
}: OutfitSaveBarProps) {
  const isMissingPieces = missingPieceCount > 0;

  return (
    <div className={styles.saveBar}>
      <Button
        type="submit"
        variant={ButtonVariant.Action}
        className={styles.submit}
        disabled={isMissingPieces || isDuplicate}
        aria-describedby={isMissingPieces ? HINT_ID : undefined}
      >
        Créer la tenue
      </Button>
      {isDuplicate && (
        <p className={styles.hint} role="status">
          Cette tenue existe déjà avec exactement ces pièces.
        </p>
      )}
      {isMissingPieces && (
        <p id={HINT_ID} className={styles.hint}>
          {buildMissingPiecesHint(missingPieceCount)}
        </p>
      )}
      {hasJustSaved && (
        <FormFeedback tone={FeedbackTone.Success}>
          Tenue créée, retrouve-la juste en dessous.
        </FormFeedback>
      )}
    </div>
  );
}
