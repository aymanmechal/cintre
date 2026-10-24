import type { VoteChoice } from '../../types/sharing';
import styles from './VoteChoices.module.css';

interface VoteChoicesProps {
  choices: readonly VoteChoice[];
  counts: Record<string, number>;
  hasVoted: boolean;
  onVote: (choice: string) => void;
}

export function VoteChoices({ choices, counts, hasVoted, onVote }: VoteChoicesProps) {
  return (
    <ul className={styles.choices}>
      {choices.map((choice) => (
        <li key={choice.value}>
          <button
            type="button"
            className={styles.choice}
            disabled={hasVoted}
            onClick={() => onVote(choice.value)}
          >
            <span className={styles.emoji} aria-hidden="true">
              {choice.emoji}
            </span>
            <span>{choice.label}</span>
            <strong className={styles.count}>{counts[choice.value] ?? 0}</strong>
          </button>
        </li>
      ))}
    </ul>
  );
}
