import { useOutfits } from '../../context/useOutfits';
import type { Outfit } from '../../types/outfit';
import { findReplacementPiece, replacePieceInOutfit } from '../../utils/outfits';
import { useWardrobe } from '../../../wardrobe/context/useWardrobe';
import type { WardrobeItem } from '../../../wardrobe/types/wardrobe';
import styles from './ReplacePieceButton.module.css';

interface ReplacePieceButtonProps {
  outfit: Outfit;
  item: WardrobeItem;
}

export function ReplacePieceButton({ outfit, item }: ReplacePieceButtonProps) {
  const { items } = useWardrobe();
  const { updateOutfit } = useOutfits();
  const replacement = findReplacementPiece(outfit, item.piece.id, items);

  if (!replacement) return null;

  return (
    <button
      type="button"
      className={styles.button}
      aria-label={`Remplacer ${item.piece.title}`}
      title={`Remplacer par ${replacement.piece.title}`}
      onClick={() =>
        updateOutfit(replacePieceInOutfit(outfit, item.piece.id, replacement.piece.id))
      }
    >
      <span aria-hidden="true">↻</span>
    </button>
  );
}
