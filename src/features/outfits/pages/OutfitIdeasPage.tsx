import { useParams } from 'react-router';
import { OutfitIdeasContent } from '../components/OutfitIdeas/OutfitIdeasContent';
import { OutfitIdeasNotFound } from '../components/OutfitIdeas/OutfitIdeasNotFound';
import { useWardrobeItems } from '../../wardrobe/hooks/useWardrobeItems';
import { formatPageTitle } from '../../../shared/utils/format';
import { parseWardrobePieceIds } from '../../../shared/pieces/utils/pieceId';

export function OutfitIdeasPage() {
  const { ids } = useParams();
  const pieceIds = parseWardrobePieceIds(ids);
  const anchors = useWardrobeItems(pieceIds);
  const isFound = anchors.length > 0 && anchors.length === pieceIds.length;

  return (
    <section>
      <title>{formatPageTitle('Idées de tenues')}</title>
      {isFound ? <OutfitIdeasContent anchors={anchors} /> : <OutfitIdeasNotFound />}
    </section>
  );
}
