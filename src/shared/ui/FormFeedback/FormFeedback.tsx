import type { ReactNode } from 'react';
import { FeedbackTone } from './feedbackTone';
import styles from './FormFeedback.module.css';

interface FormFeedbackProps {
  tone: FeedbackTone;
  children: ReactNode;
}

export function FormFeedback({ tone, children }: FormFeedbackProps) {
  const role = tone === FeedbackTone.Error ? 'alert' : 'status';

  return (
    <p className={`${styles.feedback} ${styles[tone]}`} role={role}>
      {children}
    </p>
  );
}
