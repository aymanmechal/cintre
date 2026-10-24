import type { FormEvent } from 'react';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { MAX_WISH_LENGTH, STYLIST_EXAMPLES } from '../../constants/stylist';
import styles from './StylistForm.module.css';

interface StylistFormProps {
  wish: string;
  isThinking: boolean;
  onWishChange: (wish: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function StylistForm({ wish, isThinking, onWishChange, onSubmit }: StylistFormProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label} htmlFor="stylist-wish">
        De quoi as-tu envie aujourd’hui ?
      </label>
      <textarea
        id="stylist-wish"
        className={styles.wish}
        rows={3}
        maxLength={MAX_WISH_LENGTH}
        value={wish}
        placeholder="Ex. : chic mais confortable, avec une touche de couleur"
        onChange={(event) => onWishChange(event.target.value)}
      />
      <div className={styles.examples} role="group" aria-label="Idées d’envies">
        {STYLIST_EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            className={styles.example}
            onClick={() => onWishChange(example)}
          >
            {example}
          </button>
        ))}
      </div>
      <Button
        type="submit"
        variant={ButtonVariant.Action}
        disabled={isThinking || wish.trim() === ''}
      >
        🪄 Compose-moi une tenue
      </Button>
    </form>
  );
}
