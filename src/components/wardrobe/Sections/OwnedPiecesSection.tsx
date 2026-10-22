import { OWNERSHIP_STATUS_LABELS, OwnershipStatus } from '../../../constants/wardrobe';
import type { WardrobeItem } from '../../../types/wardrobe';
import { groupOwnedItemsByLocation } from '../../../utils/wardrobe';
import { LocationGroupBlock } from './LocationGroupBlock';
import { WardrobeSection } from './WardrobeSection';

interface OwnedPiecesSectionProps {
  items: readonly WardrobeItem[];
}

export function OwnedPiecesSection({ items }: OwnedPiecesSectionProps) {
  const locationGroups = groupOwnedItemsByLocation(items);

  return (
    <WardrobeSection title={OWNERSHIP_STATUS_LABELS[OwnershipStatus.Owned]} count={items.length}>
      {locationGroups.map((group) => (
        <LocationGroupBlock key={group.location} group={group} />
      ))}
    </WardrobeSection>
  );
}
