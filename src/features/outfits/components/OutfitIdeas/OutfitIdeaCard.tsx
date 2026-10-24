import type { ReactNode } from 'react';
import { COLOR_HARMONY_LABELS } from '../../constants/outfits';
import type { OutfitIdea } from '../../types/outfit';
import { Button } from '../../../../shared/ui/Button/Button';
import { OutfitHarmony } from '../OutfitHarmony/OutfitHarmony';
import { OutfitPieceThumbnail } from '../OutfitCard/OutfitPieceThumbnail';
import styles from './OutfitIdeaCard.module.css';

interface OutfitIdeaCardProps {
  idea: OutfitIdea;
  onKeep: (idea: OutfitIdea) => void;
  children?: ReactNode;
}

export function OutfitIdeaCard({ idea, onKeep, children }: OutfitIdeaCardProps) {
  return (
    <article className={styles.card} aria-label={`Idée : ${COLOR_HARMONY_LABELS[idea.harmony]}`}>
      <OutfitHarmony items={idea.items} />
      <ul className={styles.pieces}>
        {idea.items.map((item) => (
          <li key={item.piece.id}>
            <OutfitPieceThumbnail item={item} />
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <Button onClick={() => onKeep(idea)}>Garder cette tenue</Button>
        {children}
      </div>
    </article>
  );
}
