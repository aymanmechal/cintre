import { OWNERSHIP_STATUS_LABELS, OwnershipStatus } from '../../../constants/wardrobe';
import type { WardrobeItem } from '../../../types/wardrobe';
import { WardrobeItemGrid } from '../ItemCard/WardrobeItemGrid';
import { WardrobeSection } from './WardrobeSection';

interface WantedPiecesSectionProps {
  items: readonly WardrobeItem[];
}

export function WantedPiecesSection({ items }: WantedPiecesSectionProps) {
  return (
    <WardrobeSection title={OWNERSHIP_STATUS_LABELS[OwnershipStatus.Wanted]} count={items.length}>
      <WardrobeItemGrid items={items} />
    </WardrobeSection>
  );
}
