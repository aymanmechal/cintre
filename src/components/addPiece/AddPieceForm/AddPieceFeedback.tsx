import { Link } from 'react-router';
import { SubmitStatus } from '../../../constants/addPiece';
import { ROUTES } from '../../../routes';
import { FeedbackTone } from '../../ui/FormFeedback/feedbackTone';
import { FormFeedback } from '../../ui/FormFeedback/FormFeedback';

interface AddPieceFeedbackProps {
  submitStatus: SubmitStatus;
}

export function AddPieceFeedback({ submitStatus }: AddPieceFeedbackProps) {
  if (submitStatus === SubmitStatus.Success) {
    return (
      <FormFeedback tone={FeedbackTone.Success}>
        Pièce ajoutée. <Link to={ROUTES.wardrobe}>Voir ma garde-robe</Link>
      </FormFeedback>
    );
  }

  if (submitStatus === SubmitStatus.Error) {
    return (
      <FormFeedback tone={FeedbackTone.Error}>
        Impossible d’ajouter la pièce. Vérifie ta connexion puis réessaie.
      </FormFeedback>
    );
  }

  return null;
}
