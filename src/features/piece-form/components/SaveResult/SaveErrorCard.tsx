import { useRevealOnMount } from '../../../../shared/hooks/useRevealOnMount';
import styles from './SaveErrorCard.module.css';

interface SaveErrorCardProps {
  message: string;
}

export function SaveErrorCard({ message }: SaveErrorCardProps) {
  const cardRef = useRevealOnMount<HTMLParagraphElement>();

  return (
    <p ref={cardRef} className={styles.card} role="alert">
      {message}
    </p>
  );
}
