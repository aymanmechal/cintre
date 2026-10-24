import { FeedbackTone } from '../../../../shared/ui/FormFeedback/feedbackTone';
import { FormFeedback } from '../../../../shared/ui/FormFeedback/FormFeedback';
import { BACKUP_MESSAGES, BackupStatus } from '../../constants/backup';

interface BackupFeedbackProps {
  status: BackupStatus;
}

export function BackupFeedback({ status }: BackupFeedbackProps) {
  if (status === BackupStatus.Idle) return null;
  const tone = status === BackupStatus.Error ? FeedbackTone.Error : FeedbackTone.Success;

  return <FormFeedback tone={tone}>{BACKUP_MESSAGES[status]}</FormFeedback>;
}
