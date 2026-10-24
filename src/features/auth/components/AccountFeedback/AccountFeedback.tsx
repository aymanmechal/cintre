import { FeedbackTone } from '../../../../shared/ui/FormFeedback/feedbackTone';
import { FormFeedback } from '../../../../shared/ui/FormFeedback/FormFeedback';
import { AUTH_OUTCOME_MESSAGES, AuthOutcome } from '../../constants/auth';

interface AccountFeedbackProps {
  outcome: AuthOutcome | null;
}

export function AccountFeedback({ outcome }: AccountFeedbackProps) {
  if (outcome === null || outcome === AuthOutcome.SignedIn) return null;
  const tone = outcome === AuthOutcome.CheckInbox ? FeedbackTone.Success : FeedbackTone.Error;

  return <FormFeedback tone={tone}>{AUTH_OUTCOME_MESSAGES[outcome]}</FormFeedback>;
}
