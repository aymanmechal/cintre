import { useOutfitIdeas } from '../../hooks/useOutfitIdeas';
import type { WardrobeItem } from '../../../wardrobe/types/wardrobe';
import { formatAnchorTitles } from '../../utils/outfits';
import { OutfitIdeasView } from './OutfitIdeasView';

interface OutfitIdeasContentProps {
  anchors: readonly WardrobeItem[];
}

export function OutfitIdeasContent({ anchors }: OutfitIdeasContentProps) {
  const ideas = useOutfitIdeas(anchors);
  return <OutfitIdeasView ideas={ideas} subtitle={`Autour de ${formatAnchorTitles(anchors)}`} />;
}
