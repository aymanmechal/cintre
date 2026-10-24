import { Button, ButtonVariant } from '../../../../../shared/ui/Button/Button';
import styles from './RandomOutfitButton.module.css';

interface RandomOutfitButtonProps {
  hasNoIdea: boolean;
  onClick: () => void;
}

export function RandomOutfitButton({ hasNoIdea, onClick }: RandomOutfitButtonProps) {
  return (
    <div className={styles.wrapper}>
      <Button variant={ButtonVariant.Ghost} onClick={onClick}>
        🎲 Tenue aléatoire
      </Button>
      <p className={styles.message} role="status">
        {hasNoIdea && 'Pas assez de pièces disponibles pour une idée.'}
      </p>
    </div>
  );
}
