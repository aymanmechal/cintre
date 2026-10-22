import { buildMissingPiecesHint } from '../../../../utils/outfits';
import { Button } from '../../../ui/Button/Button';
import { ButtonVariant } from '../../../ui/Button/buttonVariant';
import { FormFeedback } from '../../../ui/FormFeedback/FormFeedback';
import { FeedbackTone } from '../../../ui/FormFeedback/feedbackTone';
import styles from './OutfitSaveBar.module.css';

const HINT_ID = 'outfit-save-hint';

interface OutfitSaveBarProps {
  missingPieceCount: number;
  hasJustSaved: boolean;
}

export function OutfitSaveBar({ missingPieceCount, hasJustSaved }: OutfitSaveBarProps) {
  const isMissingPieces = missingPieceCount > 0;

  return (
    <div className={styles.saveBar}>
      <Button
        type="submit"
        variant={ButtonVariant.Action}
        className={styles.submit}
        disabled={isMissingPieces}
        aria-describedby={isMissingPieces ? HINT_ID : undefined}
      >
        Créer la tenue
      </Button>
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
