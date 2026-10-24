import { PIECE_COLOR_LABELS, type PieceColor } from '../../../../shared/pieces/constants/colors';
import { useColorIdeas } from '../../hooks/useColorIdeas';
import { OutfitIdeasView } from './OutfitIdeasView';

interface ColorIdeasContentProps {
  color: PieceColor;
}

export function ColorIdeasContent({ color }: ColorIdeasContentProps) {
  const ideas = useColorIdeas(color);
  return (
    <OutfitIdeasView
      ideas={ideas}
      subtitle={`Des tenues construites autour du ${PIECE_COLOR_LABELS[color].toLowerCase()}`}
    />
  );
}
