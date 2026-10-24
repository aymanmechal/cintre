import { KeptOutfitMessage } from '../../../outfits/components/OutfitIdeas/KeptOutfitMessage';
import { OutfitIdeaCard } from '../../../outfits/components/OutfitIdeas/OutfitIdeaCard';
import type { StylistSuggestion } from '../../types/stylist';
import styles from './StylistResult.module.css';

interface StylistResultProps {
  suggestion: StylistSuggestion;
  keptOutfitName: string | null;
  onKeep: () => void;
}

export function StylistResult({ suggestion, keptOutfitName, onKeep }: StylistResultProps) {
  return (
    <section className={styles.result} aria-label="Proposition du styliste">
      {suggestion.explanation && <p className={styles.explanation}>💬 {suggestion.explanation}</p>}
      <OutfitIdeaCard idea={suggestion.idea} onKeep={onKeep} />
      <KeptOutfitMessage outfitName={keptOutfitName} />
    </section>
  );
}
