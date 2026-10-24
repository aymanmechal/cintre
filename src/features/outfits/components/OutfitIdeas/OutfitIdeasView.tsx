import type { OutfitIdeasState } from '../../hooks/useIdeasList';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { PageHeader } from '../../../../shared/ui/PageHeader/PageHeader';
import { IdeaTasteButtons } from './IdeaTasteButtons';
import { KeptOutfitMessage } from './KeptOutfitMessage';
import { NoOutfitIdeas } from './NoOutfitIdeas';
import { OutfitIdeaCard } from './OutfitIdeaCard';
import styles from './OutfitIdeasContent.module.css';

interface OutfitIdeasViewProps {
  ideas: OutfitIdeasState;
  subtitle: string;
}

export function OutfitIdeasView({ ideas, subtitle }: OutfitIdeasViewProps) {
  return (
    <>
      <PageHeader title="Idées de tenues" subtitle={subtitle} />
      <KeptOutfitMessage outfitName={ideas.keptOutfitName} />
      {ideas.visibleIdeas.length === 0 ? (
        <NoOutfitIdeas />
      ) : (
        <ul className={styles.grid}>
          {ideas.visibleIdeas.map((idea) => (
            <li key={idea.key}>
              <OutfitIdeaCard idea={idea} onKeep={ideas.keepIdea}>
                <IdeaTasteButtons
                  isLiked={ideas.likedKeys.includes(idea.key)}
                  onToggleLike={() => ideas.toggleLike(idea)}
                  onDislike={() => ideas.dislike(idea)}
                />
              </OutfitIdeaCard>
            </li>
          ))}
        </ul>
      )}
      {ideas.hasMoreIdeas && (
        <Button variant={ButtonVariant.Ghost} className={styles.more} onClick={ideas.showMoreIdeas}>
          Encore des idées
        </Button>
      )}
    </>
  );
}
