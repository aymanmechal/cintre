import { FeedbackTone } from '../../../../shared/ui/FormFeedback/feedbackTone';
import { FormFeedback } from '../../../../shared/ui/FormFeedback/FormFeedback';
import { STYLIST_STATUS_MESSAGES, StylistStatus } from '../../constants/stylist';

interface StylistFeedbackProps {
  status: StylistStatus;
}

export function StylistFeedback({ status }: StylistFeedbackProps) {
  const message = STYLIST_STATUS_MESSAGES[status];
  if (message === '') return null;
  const tone = status === StylistStatus.Thinking ? FeedbackTone.Success : FeedbackTone.Error;

  return <FormFeedback tone={tone}>{message}</FormFeedback>;
}
