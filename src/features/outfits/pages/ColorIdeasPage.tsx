import { useParams } from 'react-router';
import { ColorIdeasContent } from '../components/OutfitIdeas/ColorIdeasContent';
import { OutfitIdeasNotFound } from '../components/OutfitIdeas/OutfitIdeasNotFound';
import { toPieceColor } from '../../../shared/pieces/utils/colors';
import { formatPageTitle } from '../../../shared/utils/format';

export function ColorIdeasPage() {
  const { color = '' } = useParams();
  const pieceColor = toPieceColor(color);

  return (
    <section>
      <title>{formatPageTitle('Idées de tenues')}</title>
      {pieceColor ? <ColorIdeasContent color={pieceColor} /> : <OutfitIdeasNotFound />}
    </section>
  );
}
