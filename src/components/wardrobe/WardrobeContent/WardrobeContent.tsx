import { OwnershipStatus } from '../../../constants/wardrobe';
import type { WardrobeItem } from '../../../types/wardrobe';
import { selectItemsByStatus } from '../../../utils/wardrobe';
import { EmptyWardrobe } from '../EmptyWardrobe/EmptyWardrobe';
import { OwnedPiecesSection } from '../Sections/OwnedPiecesSection';
import { WantedPiecesSection } from '../Sections/WantedPiecesSection';
import { WardrobeHeader } from '../WardrobeHeader/WardrobeHeader';

interface WardrobeContentProps {
  items: readonly WardrobeItem[];
}

export function WardrobeContent({ items }: WardrobeContentProps) {
  const ownedItems = selectItemsByStatus(items, OwnershipStatus.Owned);
  const wantedItems = selectItemsByStatus(items, OwnershipStatus.Wanted);

  return (
    <>
      <WardrobeHeader ownedCount={ownedItems.length} wantedCount={wantedItems.length} />
      {items.length === 0 && <EmptyWardrobe />}
      {ownedItems.length > 0 && <OwnedPiecesSection items={ownedItems} />}
      {wantedItems.length > 0 && <WantedPiecesSection items={wantedItems} />}
    </>
  );
}
